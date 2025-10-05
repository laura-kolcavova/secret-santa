import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { DrawGroup } from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';
import { DrawnParticipant } from '../models/DrawnParticipant';
import { drawGroupsQueries } from '~/persistence/drawGroups/drawGroupsQueries';
import { drawGroupsCommands } from '~/persistence/drawGroups/drawGroupsCommands';

const findByYear = (year: number): DrawGroup | undefined => {
  const drawGroup = drawGroupsQueries.findByYear(year);

  return drawGroup;
};

const findByGuid = (guid: string): DrawGroup | undefined => {
  const drawGroup = drawGroupsQueries.findByGuid(guid);

  return drawGroup;
};

const addParticipant = (drawGroup: DrawGroup, participantEmail: string): DrawGroupParticipant => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  const newDrawGroupParticipant: DrawGroupParticipant = {
    email: normalizedParticipantEmail,
    hasDrawn: false,
  };

  drawGroup.participants.push(newDrawGroupParticipant);

  drawGroupsCommands.addParticipant(drawGroup, newDrawGroupParticipant);

  return newDrawGroupParticipant;
};

const confirmDrawnParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
  drawnParticipant: DrawGroupParticipant,
): DrawnParticipant => {
  const newDrawnParticipant: DrawnParticipant = {
    email: drawnParticipant.email,
  };

  participant.hasDrawn = true;
  participant.drawnParticipant = newDrawnParticipant;

  drawGroupsCommands.confirmDrawnParticipant(drawGroup, participant);

  return newDrawnParticipant;
};

export const drawGroupManager = {
  findByYear,
  findByGuid,
  addParticipant,
  confirmDrawnParticipant,
};
