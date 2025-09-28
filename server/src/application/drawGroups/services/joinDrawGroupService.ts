import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';
import { checkParticipantJoined } from '../utils/drawGroupHelpers';

const joinDrawGroup = (drawGroupGuid: string, participantEmail: string): UnitResult => {
  const drawGroup = drawGroupManager.findByGuid(drawGroupGuid);

  if (!drawGroup) {
    return unitResultError(drawGroupErrors.notFound());
  }

  if (checkParticipantJoined(drawGroup, participantEmail)) {
    return unitResultError(drawGroupErrors.participantAlreadyJoined());
  }

  drawGroupManager.addParticipant(drawGroup, participantEmail);

  return unitResultSuccess();
};

export const joinDrawGroupService = {
  joinDrawGroup,
};
