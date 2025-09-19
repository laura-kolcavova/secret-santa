import { ValidationError } from '../shared/ValidationError';

const notFound = (): ValidationError => ({
  code: 'User.NotFound',
  message: 'User was not found',
});

const pinDoNotMatch = (): ValidationError => ({
  code: 'User.PinDoNotMatch',
  message: 'User was not found',
});

const emailAlreadyExists = (): ValidationError => ({
  code: 'User.EmailAlreadyExists',
  message: 'User with this email already exists',
});

export const userErrors = {
  notFound,
  pinDoNotMatch,
  emailAlreadyExists,
};
