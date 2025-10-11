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

export const drawRandomParticipant = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
): DrawGroupParticipant | undefined => {
  if (drawGroup.participants.length <= 1) {
    return undefined;
  }

  const participantsToDraw = getParticipantsToDraw(drawGroup, participant);

  if (participantsToDraw.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * participantsToDraw.length);

  const drawnParticipant = participantsToDraw[randomIndex];

  return drawnParticipant;
};

const getParticipantsToDraw = (
  drawGroup: DrawGroup,
  participant: DrawGroupParticipant,
): DrawGroupParticipant[] => {
  const participantNormalizedEmail = normalizeEmail(participant.email);

  return drawGroup.participants.filter(
    (drawGroupParticipant) =>
      !drawGroupParticipant.isDrawn && drawGroupParticipant.email != participantNormalizedEmail,
  );
};
