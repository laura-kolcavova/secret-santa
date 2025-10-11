import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';
import { hasParticipantByEmail } from '../models/DrawGroup';

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

  drawGroupManager.addParticipant(drawGroup, participantEmail, abortSignal);

  return unitResultSuccess();
};

export const joinDrawGroupService = {
  joinDrawGroup,
};
