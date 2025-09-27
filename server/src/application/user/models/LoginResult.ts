import { ValidationError } from '~/application/shared/models/ValidationError';
import { User } from './User';

export type LoginResult = {
  isSuccess: boolean;
  user?: User;
  error?: ValidationError;
};

export const loginResultSuccess = (user: User): LoginResult => ({
  isSuccess: true,
  user: user,
});

export const loginResultError = (error: ValidationError): LoginResult => ({
  isSuccess: false,
  error: error,
});
