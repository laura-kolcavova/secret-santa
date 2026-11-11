import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import UserRoles from '~/application/user/models/userRoles';
import {
  DrawGroupDetailDto,
  DrawGroupNonParticipantDetailDto,
  DrawGroupParticipantDetailDto,
  DrawnParticipanDetaiLDto,
} from './DrawGroupDetailDto';
import { getDrawGroupDetailValidation } from './getDrawGroupDetailValidation';
import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { userManager } from '~/application/user/services/userManager';
import { userErrors } from '~/application/user/userErrors';
import { GetDrawGroupDetailParams } from './GetDrawGroupDetailParams';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';

export const mapGetDrawGroupDetail = (router: Router) => {
  router.get(
    '/:drawGroupGuid/detail',
    userAuthorizationWithRolesHandler(UserRoles.DrawGroupManager),
    getDrawGroupDetailValidation,
    handle,
  );
};

const handle = (req: Request<GetDrawGroupDetailParams>, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, params } = req;

    const drawGroupDetailDtoResult = getDrawGroupDetail(params.drawGroupGuid, abortSignal);

    if (!drawGroupDetailDtoResult.isSuccess) {
      const problemDetails = createProblemDetails(drawGroupDetailDtoResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    const drawGroupDetailDto = drawGroupDetailDtoResult.value!;

    if (!drawGroupDetailDto) {
      res.status(204).send();

      return;
    }

    res.status(200).json(drawGroupDetailDto);
  } catch (error) {
    next(error);
  }
};

const getDrawGroupDetail = (
  guid: string,
  abortSignal: AbortSignal,
): Result<DrawGroupDetailDto | undefined> => {
  const drawGroup = drawGroupManager.findByGuid(guid, abortSignal);

  if (!drawGroup) {
    return resultSuccess(undefined);
  }

  var users = userManager.findAll(abortSignal);

  const usersByEmail = new Map(users.map((user) => [user.email, user]));

  const participantDetailDtos: DrawGroupParticipantDetailDto[] = [];

  for (var participant of drawGroup.participants) {
    var user = usersByEmail.get(participant.email);

    if (!user) {
      return resultError(userErrors.notFound());
    }

    const drawnParticipantDetailDto: DrawnParticipanDetaiLDto | undefined =
      participant.drawnParticipant === undefined
        ? undefined
        : {
            email: participant.drawnParticipant.email,
          };

    const participantDetailDto: DrawGroupParticipantDetailDto = {
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      hasDrawn: participant.hasDrawn,
      drawnParticipant: drawnParticipantDetailDto,
    };

    participantDetailDtos.push(participantDetailDto);
  }

  const participantEmails = new Set(drawGroup.participants.map((participant) => participant.email));

  const nonParticipantDtos: DrawGroupNonParticipantDetailDto[] = users
    .filter((user) => !participantEmails.has(user.email))
    .map((user) => ({ email: user.email, fullName: `${user.firstName} ${user.lastName}` }));

  const drawGroupDetailDto: DrawGroupDetailDto = {
    guid: drawGroup.guid,
    name: drawGroup.name,
    year: drawGroup.year,
    drawStartUtc: drawGroup.drawStartUtc.toISOString(),
    drawEndUtc: drawGroup.drawEndUtc.toISOString(),
    participants: participantDetailDtos,
    nonParticipants: nonParticipantDtos,
    createdAtUtc: drawGroup.createdAtUtc.toISOString(),
  };

  return resultSuccess(drawGroupDetailDto);
};
