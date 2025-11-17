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

const drawHasAlreadyEnded = (): ValidationError => ({
  code: 'DrawGroup.DrawHasAlreadyEnded',
  message: 'Draw has already ended.',
});

const drawHasAlreadyStarted = (): ValidationError => ({
  code: 'DrawGroup.DrawHasAlreadyStarted',
  message: 'Draw has already started.',
});

const drawNotStartedYet = (): ValidationError => ({
  code: 'DrawGroup.DrawNotStartedYet',
  message: 'Draw not started yet.',
});

const alreadyExistsWithNameAndYear = (): ValidationError => ({
  code: 'DrawGroup.AlreadyExistsWithNameAndYear',
  message: 'Draw group with this name and year already exists.',
});

const invalidDrawPeriod = (): ValidationError => ({
  code: 'DrawGroup.InvalidDrawPeriod',
  message: 'Draw end date must be after draw start date.',
});

export const drawGroupErrors = {
  notFound,
  userAlreadyJoined,
  userNotJoined,
  noParticipantsToDraw,
  userAlreadyDrawn,
  drawHasAlreadyEnded,
  drawHasAlreadyStarted,
  drawNotStartedYet,
  alreadyExistsWithNameAndYear,
  invalidDrawPeriod,
};
