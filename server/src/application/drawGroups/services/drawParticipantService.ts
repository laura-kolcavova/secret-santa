import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawGroupManager } from './drawGroupManager';
import { drawRandomParticipant, findParticipantByEmail } from '../models/DrawGroup';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const drawParticipant = async (
  drawGroupGuid: string,
  participantEmail: string,
  abortSignal: AbortSignal,
): Promise<Result<DrawnParticipant>> => {
  const releaseMutex = await mutex.acquire();

  try {
    const drawGroup = drawGroupManager.findByGuid(drawGroupGuid, abortSignal);

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
      abortSignal,
    );

    return resultSuccess(newDrawnParticipant);
  } finally {
    releaseMutex();
  }
};

export const drawParticipantService = {
  drawParticipant,
};
