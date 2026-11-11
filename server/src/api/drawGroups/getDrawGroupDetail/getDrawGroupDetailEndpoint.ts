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
import { userManager } from '~/application/user/services/userManager';
import { GetDrawGroupDetailParams } from './GetDrawGroupDetailParams';
import { getFullName } from '~/application/user/models/User';

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

    const drawGroupDetailDto = getDrawGroupDetail(params.drawGroupGuid, abortSignal);

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
): DrawGroupDetailDto | undefined => {
  const drawGroup = drawGroupManager.findByGuid(guid, abortSignal);

  if (!drawGroup) {
    return undefined;
  }

  var users = userManager.findAll(abortSignal);

  const usersByEmail = new Map(users.map((user) => [user.email, user]));

  const participantDetailDtos: DrawGroupParticipantDetailDto[] = [];

  for (const participant of drawGroup.participants) {
    const user = usersByEmail.get(participant.email);

    const fullName = user ? getFullName(user) : '';

    const drawnParticipantDetailDto: DrawnParticipanDetaiLDto | undefined =
      participant.drawnParticipant === undefined
        ? undefined
        : {
            email: participant.drawnParticipant.email,
          };

    const participantDetailDto: DrawGroupParticipantDetailDto = {
      email: participant.email,
      fullName: fullName,
      hasDrawn: participant.hasDrawn,
      drawnParticipant: drawnParticipantDetailDto,
    };

    participantDetailDtos.push(participantDetailDto);
  }

  const participantsByEmail = new Map(
    drawGroup.participants.map((participant) => [participant.email, participant]),
  );

  const nonParticipantDetailDtos: DrawGroupNonParticipantDetailDto[] = [];

  for (const user of users) {
    const participant = participantsByEmail.get(user.email);

    if (participant) {
      continue;
    }

    const nonParticipantDetailDto: DrawGroupNonParticipantDetailDto = {
      email: user.email,
      fullName: getFullName(user),
    };

    nonParticipantDetailDtos.push(nonParticipantDetailDto);
  }

  const drawGroupDetailDto: DrawGroupDetailDto = {
    guid: drawGroup.guid,
    name: drawGroup.name,
    year: drawGroup.year,
    drawStartUtc: drawGroup.drawStartUtc.toISOString(),
    drawEndUtc: drawGroup.drawEndUtc.toISOString(),
    participants: participantDetailDtos,
    nonParticipants: nonParticipantDetailDtos,
    createdAtUtc: drawGroup.createdAtUtc.toISOString(),
  };

  return drawGroupDetailDto;
};
