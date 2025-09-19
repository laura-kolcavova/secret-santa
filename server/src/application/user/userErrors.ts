import { ValidationError } from '../shared/ValidationError';

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

export const userErrors = {
  notFound,
  pinDoesNotMatch,
  emailAlreadyExists,
};
