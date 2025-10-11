import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { DrawGroup } from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupsQueries } from '~/persistence/drawGroups/drawGroupsQueries';
import { drawGroupsCommands } from '~/persistence/drawGroups/drawGroupsCommands';

const findByYear = (year: number, abortSignal: AbortSignal): DrawGroup | undefined => {
  const drawGroup = drawGroupsQueries.findByYear(year, abortSignal);

  return drawGroup;
};

const findByGuid = (guid: string, abortSignal: AbortSignal): DrawGroup | undefined => {
  const drawGroup = drawGroupsQueries.findByGuid(guid, abortSignal);

  return drawGroup;
};

const addParticipant = (
  drawGroup: DrawGroup,
  participantEmail: string,
  abortSignal: AbortSignal,
): DrawGroupParticipant => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  const newDrawGroupParticipant: DrawGroupParticipant = {
    email: normalizedParticipantEmail,
    hasDrawn: false,
    isDrawn: false,
  };

  drawGroup.participants.push(newDrawGroupParticipant);

  drawGroupsCommands.addParticipant(drawGroup, newDrawGroupParticipant, abortSignal);

  return newDrawGroupParticipant;
};

const confirmDrawnParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
  drawnParticipant: DrawGroupParticipant,
  abortSignal: AbortSignal,
): DrawnParticipant => {
  const newDrawnParticipant: DrawnParticipant = {
    email: drawnParticipant.email,
  };

  participant.hasDrawn = true;
  participant.drawnParticipant = newDrawnParticipant;

  drawnParticipant.isDrawn = true;

  drawGroupsCommands.confirmDrawnParticipant(drawGroup, participant, abortSignal);

  return newDrawnParticipant;
};

export const drawGroupManager = {
  findByYear,
  findByGuid,
  addParticipant,
  confirmDrawnParticipant,
};
