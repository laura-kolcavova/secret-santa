import { ValidationError } from '~/application/shared/ValidationError';

export type RegisterResult = {
  isSuccess: boolean;
  error?: ValidationError;
};

export const registerResultSuccess = (): RegisterResult => ({
  isSuccess: true,
});

export const registerResultError = (error: ValidationError): RegisterResult => ({
  isSuccess: false,
  error: error,
});
