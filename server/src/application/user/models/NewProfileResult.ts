import { ValidationError } from '~/application/shared/models/ValidationError';

export type NewProfileResult = {
  isSuccess: boolean;
  error?: ValidationError;
};

export const registerResultSuccess = (): NewProfileResult => ({
  isSuccess: true,
});

export const registerResultError = (error: ValidationError): NewProfileResult => ({
  isSuccess: false,
  error: error,
});
