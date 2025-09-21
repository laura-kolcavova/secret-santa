import { ValidationError } from '~/application/shared/ValidationError';

export type UnitResult = {
  isSuccess: boolean;
  error?: ValidationError;
};

export const unitResultSuccess = (): UnitResult => ({
  isSuccess: true,
});

export const unitResultError = (error: ValidationError): UnitResult => ({
  isSuccess: false,
  error: error,
});
