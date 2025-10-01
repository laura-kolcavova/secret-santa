import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { DrawGroup } from '../models/DrawGroup';
import { DrawGroupParticipant } from '../models/DrawGroupParticipant';

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

export const getParticipantsToDraw = (
  drawGroup: DrawGroup,
  participantEmail: string,
): DrawGroupParticipant[] => {
  const participantNormalizedEmail = normalizeEmail(participantEmail);

  return drawGroup.participants.filter(
    (drawGroupParticipant) =>
      drawGroupParticipant.email !== participantNormalizedEmail && !drawGroupParticipant.isDrawn,
  );
};
