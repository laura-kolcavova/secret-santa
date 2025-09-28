import { ValidationError } from '../shared/models/ValidationError';

const notFound = (): ValidationError => ({
  code: 'DrawGroup.NotFound',
  message: 'Draw group was not found',
});

const userAlreadyJoined = (): ValidationError => ({
  code: 'DrawGroup.UserAlreadyJoined',
  message: 'The user already joined this draw group',
});

const userNotJoined = (): ValidationError => ({
  code: 'DrawGroup.UserNotJoined',
  message: 'The user has not joined this draw group',
});

const noParticipantsToDraw = (): ValidationError => ({
  code: 'DrawGroup.NoParticipantsToDraw',
  message: 'There are no participants to draw.',
});

export const drawGroupErrors = {
  notFound,
  userAlreadyJoined,
  userNotJoined,
  noParticipantsToDraw,
};
