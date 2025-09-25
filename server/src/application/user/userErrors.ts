import { ValidationError } from '../shared/models/ValidationError';

const notFound = (): ValidationError => ({
  code: 'User.NotFound',
  message: 'User was not found',
});

const pinDoesNotMatch = (): ValidationError => ({
  code: 'User.PinDoesNotMatch',
  message: 'Pin does not match',
});

const emailAlreadyExists = (): ValidationError => ({
  code: 'User.EmailAlreadyExists',
  message: 'User with this email already exists',
});

const invalidCurrentPin = (): ValidationError => ({
  code: 'User.InvalidCurrentPin',
  message: 'The current PIN you entered is incorrect.',
});

const newPinMustDiffer = (): ValidationError => ({
  code: 'User.NewPinMustDiffer',
  message: 'The new PIN must be different from the current PIN',
});

export const userErrors = {
  notFound,
  pinDoesNotMatch,
  emailAlreadyExists,
  invalidCurrentPin,
  newPinMustDiffer,
};
