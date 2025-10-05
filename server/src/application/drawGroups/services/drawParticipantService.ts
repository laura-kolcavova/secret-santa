import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawGroupManager } from './drawGroupManager';
import { drawRandomParticipant, findParticipantByEmail } from '../utils/drawGroupHelpers';

const drawParticipant = (
  drawGroupGuid: string,
  participantEmail: string,
): Result<DrawnParticipant> => {
  const drawGroup = drawGroupManager.findByGuid(drawGroupGuid);

  if (!drawGroup) {
    return resultError(drawGroupErrors.notFound());
  }

  const participant = findParticipantByEmail(drawGroup, participantEmail);

  if (!participant) {
    return resultError(drawGroupErrors.userNotJoined());
  }

  if (participant.hasDrawn) {
    return resultError(drawGroupErrors.userAlreadyDrawn());
  }

  const drawnParticipant = drawRandomParticipant(drawGroup, participant);

  if (!drawnParticipant) {
    return resultError(drawGroupErrors.noParticipantsToDraw());
  }

  const newDrawnParticipant = drawGroupManager.confirmDrawnParticipant(
    drawGroup,
    participant,
    drawnParticipant,
  );

  return resultSuccess(newDrawnParticipant);
};

export const drawParticipantService = {
  drawParticipant,
};
