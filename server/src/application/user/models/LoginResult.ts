import { ValidationError } from '~/application/shared/ValidationError';

export type LoginResult = {
  isSuccess: boolean;
  error?: ValidationError;
};
