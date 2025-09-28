import { normalizeEmail } from '~/application/shared/emailHelper';
import { DrawGroup } from '../models/DrawGroup';

export const checkParticipantJoined = (drawGroup: DrawGroup, participantEmail: string): boolean => {
  const normalizedParticipantEmail = normalizeEmail(participantEmail);

  return (
    drawGroup.participants.length > 0 &&
    drawGroup.participants.some(
      (drawGroupParticipant) => drawGroupParticipant.email === normalizedParticipantEmail,
    )
  );
};
