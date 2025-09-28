import { normalizeEmail } from '~/application/shared/emailHelper';
import { mockDraws } from '../mockDrawsGroups';
import { DrawGroup } from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';

const findByYear = (year: number): DrawGroup | undefined => {
  const drawGroup = mockDraws.find((draw) => draw.year === year);

  if (drawGroup === undefined) {
    return undefined;
  }

  return { ...drawGroup };
};

const findByGuid = (drawGroupGuid: string): DrawGroup | undefined => {
  const drawGroup = mockDraws.find((draw) => draw.guid === drawGroupGuid);

  if (drawGroup === undefined) {
    return undefined;
  }

  return { ...drawGroup };
};

const addParticipant = (drawGroup: DrawGroup, participantEmail: string) => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  const newDrawGroupParticipant: DrawGroupParticipant = {
    email: normalizedParticipantEmail,
  };

  drawGroup.participants.push(newDrawGroupParticipant);
};

export const drawGroupManager = {
  findByYear,
  findByGuid,
  addParticipant,
};
