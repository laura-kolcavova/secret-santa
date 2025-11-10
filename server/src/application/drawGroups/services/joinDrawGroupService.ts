import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawHasEnded, drawHasStarted, hasParticipantByEmail } from '../models/DrawGroup';

const joinDrawGroup = (
  drawGroupGuid: string,
  participantEmail: string,
  abortSignal: AbortSignal,
): UnitResult => {
  const drawGroup = drawGroupManager.findByGuid(drawGroupGuid, abortSignal);

  if (!drawGroup) {
    return unitResultError(drawGroupErrors.notFound());
  }

  if (hasParticipantByEmail(drawGroup, participantEmail)) {
    return unitResultError(drawGroupErrors.userAlreadyJoined());
  }

  if (drawHasEnded(drawGroup)) {
    return unitResultError(drawGroupErrors.drawHasAlreadyEnded());
  }

  if (drawHasStarted(drawGroup)) {
    return unitResultError(drawGroupErrors.drawHasAlreadyStarted());
  }

  drawGroupManager.joinDrawGroup(participantEmail, drawGroup, abortSignal);

  return unitResultSuccess();
};

export const joinDrawGroupService = {
  joinDrawGroup,
};
