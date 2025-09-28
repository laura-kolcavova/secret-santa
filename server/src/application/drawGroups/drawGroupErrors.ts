import { ValidationError } from '../shared/models/ValidationError';

const notFound = (): ValidationError => ({
  code: 'DrawGroup.NotFound',
  message: 'Draw group was not found',
});

const participantAlreadyJoined = (): ValidationError => ({
  code: 'DrawGroup.ParticipantAlreadyJoined',
  message: 'The participant has already joined this draw group.',
});

export const drawGroupErrors = {
  notFound,
  participantAlreadyJoined,
};
