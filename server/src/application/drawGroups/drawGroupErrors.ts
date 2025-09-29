import { ValidationError } from '../shared/models/ValidationError';

const notFound = (): ValidationError => ({
  code: 'DrawGroup.NotFound',
  message: 'Group was not found.',
});

const userAlreadyJoined = (): ValidationError => ({
  code: 'DrawGroup.UserAlreadyJoined',
  message: 'The user already joined this group.',
});

const userNotJoined = (): ValidationError => ({
  code: 'DrawGroup.UserNotJoined',
  message: 'The user has not joined this group.',
});

const userAlreadyDrawn = (): ValidationError => ({
  code: 'DrawGroup.UserAlreadyDrawn',
  message: 'The user has already drawn in this group.',
});

const noParticipantsToDraw = (): ValidationError => ({
  code: 'DrawGroup.NoParticipantsToDraw',
  message: 'There are no participants to draw in this group.',
});

export const drawGroupErrors = {
  notFound,
  userAlreadyJoined,
  userNotJoined,
  noParticipantsToDraw,
  userAlreadyDrawn,
};
