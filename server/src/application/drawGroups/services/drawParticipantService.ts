import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawGroupManager } from './drawGroupManager';
import { findParticipantByEmail, getParticipantsToDraw } from '../utils/drawGroupHelpers';

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

  const participantsToDraw = getParticipantsToDraw(drawGroup, participantEmail);

  if (participantsToDraw.length === 0) {
    return resultError(drawGroupErrors.noParticipantsToDraw());
  }

  const randomIndex = Math.floor(Math.random() * participantsToDraw.length);

  const drawnParticipant = participantsToDraw[randomIndex];

  const newDrawnParticipant = drawGroupManager.addDrawnParticipant(
    drawGroup,
    participant,
    drawnParticipant,
  );

  return resultSuccess(newDrawnParticipant);
};

export const drawParticipantService = {
  drawParticipant,
};
