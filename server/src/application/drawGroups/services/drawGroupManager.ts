import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { DrawGroup } from '../models/DrawGroup';
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

const drawParticipant = (
  participant: DrawGroupParticipant,
  participantsToDraw: DrawGroupParticipant[],
  drawGroup: DrawGroup,
  abortSignal: AbortSignal,
): DrawnParticipant => {
  const drawnParticipant = getRandomParticipantToDraw(participantsToDraw);

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
  drawParticipant,
};

const getRandomParticipantToDraw = (
  participantsToDraw: DrawGroupParticipant[],
): DrawGroupParticipant => {
  if (participantsToDraw.length === 0) {
    throw new Error('No participants available to draw');
  }

  const randomIndex = Math.floor(Math.random() * participantsToDraw.length);

  const drawnParticipant = participantsToDraw[randomIndex];

  return drawnParticipant;
};
