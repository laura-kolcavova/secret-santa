import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import {
  DrawGroup,
  getParticipantsWhoHaveNotDrawn,
  getUndrawnParticipants,
} from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupRepository } from '~/persistence/drawGroups/drawGroupRepository';

const findByGuid = (guid: string, abortSignal: AbortSignal): DrawGroup | undefined => {
  const drawGroup = drawGroupRepository.findByGuid(guid, abortSignal);

  return drawGroup;
};

const getAllByYear = (year: number, abortSignal: AbortSignal): DrawGroup[] => {
  const drawGroups = drawGroupRepository.getAllByYear(year, abortSignal);

  return drawGroups;
};

const getAll = (abortSignal: AbortSignal): DrawGroup[] => {
  const drawGroups = drawGroupRepository.getAll(abortSignal);

  return drawGroups;
};

const joinDrawGroup = (
  participantEmail: string,
  drawGroup: DrawGroup,
  abortSignal: AbortSignal,
): DrawGroupParticipant => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  const newDrawGroupParticipant: DrawGroupParticipant = {
    email: normalizedParticipantEmail,
    hasDrawn: false,
    isDrawn: false,
  };

  drawGroup.participants.push(newDrawGroupParticipant);

  drawGroupRepository.addParticipant(drawGroup, newDrawGroupParticipant, abortSignal);

  return newDrawGroupParticipant;
};

const drawParticipantFromDrawGroup = (
  participant: DrawGroupParticipant,
  drawGroup: DrawGroup,
  abortSignal: AbortSignal,
): DrawnParticipant | undefined => {
  const drawnParticipant = safelyDrawParticipant(participant, drawGroup);

  if (!drawnParticipant) {
    return undefined;
  }

  const newDrawnParticipant: DrawnParticipant = {
    email: drawnParticipant.email,
  };

  participant.hasDrawn = true;
  participant.drawnParticipant = newDrawnParticipant;

  drawnParticipant.isDrawn = true;

  drawGroupRepository.confirmDrawnParticipant(drawGroup, participant, abortSignal);

  return newDrawnParticipant;
};

export const drawGroupManager = {
  findByGuid,
  getAllByYear,
  getAll,
  joinDrawGroup,
  drawParticipantFromDrawGroup,
};

const safelyDrawParticipant = (
  participant: DrawGroupParticipant,
  drawGroup: DrawGroup,
): DrawGroupParticipant | undefined => {
  const undrawnParticipants = getUndrawnParticipants(drawGroup);

  const participantsToDraw = excludeParticipant(undrawnParticipants, participant);

  if (participantsToDraw.length === 0) {
    return undefined;
  }

  if (participantsToDraw.length === 1) {
    return participantsToDraw[0];
  }

  // Issue: The last participant would draw themselves.
  // Solution: Drawing is truly random until there are only two participants left.
  // For the second-to-last participant, we need to check if the last participant is among the participants to draw.
  // If yes, the second-to-last participant must draw the last participant. For the last participant, the drawing is truly random again.
  // If no, both the second-to-last and last participants draw truly randomly.
  if (participantsToDraw.length === 2) {
    const participantsWhoHaveNotDrawn = getParticipantsWhoHaveNotDrawn(drawGroup);

    const lastParticipantWhoHasNotDrawn = excludeParticipant(
      participantsWhoHaveNotDrawn,
      participant,
    )[0];

    if (containsParticipant(participantsToDraw, lastParticipantWhoHasNotDrawn)) {
      return lastParticipantWhoHasNotDrawn;
    }
  }

  return getRandomParticipant(participantsToDraw);
};

const excludeParticipant = (
  participants: DrawGroupParticipant[],
  participant: DrawGroupParticipant,
): DrawGroupParticipant[] => {
  return participants.filter(
    (drawGroupParticipant) => drawGroupParticipant.email != participant.email,
  );
};

const containsParticipant = (
  participants: DrawGroupParticipant[],
  participant: DrawGroupParticipant,
): boolean => {
  return (
    participants.length > 0 &&
    participants.some((drawGroupParticipant) => drawGroupParticipant.email === participant.email)
  );
};

const getRandomParticipant = (participants: DrawGroupParticipant[]): DrawGroupParticipant => {
  if (participants.length === 0) {
    throw new Error('No participants available to draw');
  }

  const randomIndex = Math.floor(Math.random() * participants.length);

  const drawnParticipant = participants[randomIndex];

  return drawnParticipant;
};
