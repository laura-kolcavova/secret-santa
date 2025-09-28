import { normalizeEmail } from '~/application/shared/emailHelper';
import { DrawGroup } from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';
import { mockDrawGroups } from '~/persistence/drawGroups/mockDrawGroups';
import { DrawnParticipant } from '../models/DrawnParticipant';

const findByYear = (year: number): DrawGroup | undefined => {
  const drawGroup = mockDrawGroups.find((persistedDrawGroup) => persistedDrawGroup.year === year);

  if (drawGroup === undefined) {
    return undefined;
  }

  return cloneDrawGroup(drawGroup);
};

const findByGuid = (drawGroupGuid: string): DrawGroup | undefined => {
  const drawGroup = mockDrawGroups.find(
    (persistedDrawGroup) => persistedDrawGroup.guid === drawGroupGuid,
  );

  if (drawGroup === undefined) {
    return undefined;
  }

  return cloneDrawGroup(drawGroup);
};

const addParticipant = (drawGroup: DrawGroup, participantEmail: string): DrawGroupParticipant => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  const newDrawGroupParticipant: DrawGroupParticipant = {
    email: normalizedParticipantEmail,
    hasDrawn: false,
  };

  drawGroup.participants.push(newDrawGroupParticipant);

  mockDrawGroups.forEach((persistedDrawGroup) => {
    if (persistedDrawGroup.guid !== drawGroup.guid) {
      return;
    }

    persistedDrawGroup.participants.push(newDrawGroupParticipant);
  });

  return newDrawGroupParticipant;
};

const addDrawnParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
  drawnParticipant: DrawGroupParticipant,
): DrawnParticipant => {
  const newDrawnParticipant: DrawnParticipant = {
    email: drawnParticipant.email,
  };

  participant.hasDrawn = true;
  participant.drawnParticipant = newDrawnParticipant;

  mockDrawGroups.forEach((persistedDrawGroup) => {
    if (persistedDrawGroup.guid !== drawGroup.guid) {
      return;
    }

    persistedDrawGroup.participants.forEach((persitedDrawGroupParticipant) => {
      if (persitedDrawGroupParticipant.email !== participant.email) {
        return;
      }

      persitedDrawGroupParticipant.hasDrawn = true;
      persitedDrawGroupParticipant.drawnParticipant = newDrawnParticipant;
    });
  });

  return newDrawnParticipant;
};

export const drawGroupManager = {
  findByYear,
  findByGuid,
  addParticipant,
  addDrawnParticipant,
};

const cloneDrawGroup = (drawGroup: DrawGroup): DrawGroup => {
  return {
    ...drawGroup,
    participants: drawGroup.participants.map((participant) => ({
      ...participant,
      drawnParticipant: participant.drawnParticipant
        ? { ...participant.drawnParticipant }
        : undefined,
    })),
  };
};
