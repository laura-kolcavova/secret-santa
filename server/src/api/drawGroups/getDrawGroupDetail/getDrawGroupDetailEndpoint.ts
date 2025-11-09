import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import UserRoles from '~/application/user/models/userRoles';
import {
  DrawGroupDetailDto,
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

  const participantDetailDtos: DrawGroupParticipantDetailDto[] = [];

  for (var participant of drawGroup.participants) {
    var user = userManager.findByEmail(participant.email, abortSignal);

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

  const drawGroupDetailDto: DrawGroupDetailDto = {
    guid: drawGroup.guid,
    name: drawGroup.name,
    year: drawGroup.year,
    drawStartUtc: drawGroup.drawStartUtc.toISOString(),
    drawEndUtc: drawGroup.drawEndUtc.toISOString(),
    participants: participantDetailDtos,
    createdAtUtc: drawGroup.createdAtUtc.toISOString(),
  };

  return resultSuccess(drawGroupDetailDto);
};
