import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { DrawGroupParticipant } from './DrawGroupParticipant';

export type DrawGroup = {
  guid: string;
  year: number;
  name: string;
  drawStartUtc: Date;
  drawEndUtc: Date;
  participants: DrawGroupParticipant[];
  createdAtUtc: Date;
};

export const drawHasStarted = (drawGroup: DrawGroup): boolean => {
  const nowUtc = new Date(Date.now());

  return nowUtc >= drawGroup.drawStartUtc && nowUtc <= drawGroup.drawEndUtc;
};

export const drawHasEnded = (drawGroup: DrawGroup): boolean => {
  const nowUtc = new Date(Date.now());

  return nowUtc > drawGroup.drawEndUtc;
};

export const hasParticipantByEmail = (drawGroup: DrawGroup, participantEmail: string): boolean => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  return (
    drawGroup.participants.length > 0 &&
    drawGroup.participants.some(
      (drawGroupParticipant) => drawGroupParticipant.email === normalizedParticipantEmail,
    )
  );
};

export const findParticipantByEmail = (
  drawGroup: DrawGroup,
  participantEmail: string,
): DrawGroupParticipant | undefined => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  return drawGroup.participants.find(
    (drawGroupParticipant) => drawGroupParticipant.email === normalizedParticipantEmail,
  );
};

export const getUndrawnParticipants = (drawGroup: DrawGroup): DrawGroupParticipant[] => {
  return drawGroup.participants.filter((drawGroupParticipant) => !drawGroupParticipant.isDrawn);
};

export const getParticipantsWhoHaveNotDrawn = (drawGroup: DrawGroup): DrawGroupParticipant[] => {
  return drawGroup.participants.filter((drawGroupParticipant) => !drawGroupParticipant.hasDrawn);
};
