import { ValidationError } from '~/application/shared/models/ValidationError';
import { IdentityUser } from './IdentityUser';

export type LoginResult = {
  isSuccess: boolean;
  user?: IdentityUser;
  error?: ValidationError;
};

export const loginResultSuccess = (user: IdentityUser): LoginResult => ({
  isSuccess: true,
  user: user,
});

export const loginResultError = (error: ValidationError): LoginResult => ({
  isSuccess: false,
  error: error,
});
