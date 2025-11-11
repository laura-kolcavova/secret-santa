import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawGroupManager } from './drawGroupManager';
import { drawHasEnded, drawHasStarted, findParticipantByEmail } from '../models/DrawGroup';
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

    if (drawHasEnded(drawGroup)) {
      return resultError(drawGroupErrors.drawHasAlreadyEnded());
    }

    if (!drawHasStarted(drawGroup)) {
      return resultError(drawGroupErrors.drawNotStartedYet());
    }

    const drawnParticipant = drawGroupManager.drawParticipantFromDrawGroup(
      participant,
      drawGroup,
      abortSignal,
    );

    if (!drawnParticipant) {
      return resultError(drawGroupErrors.noParticipantsToDraw());
    }

    return resultSuccess(drawnParticipant);
  } finally {
    releaseMutex();
  }
};

export const drawParticipantService = {
  drawParticipant,
};
