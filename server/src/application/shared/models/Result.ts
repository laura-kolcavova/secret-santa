import { ValidationError } from '~/application/shared/models/ValidationError';

export type Result<TValue> = {
  isSuccess: boolean;
  value?: TValue;
  error?: ValidationError;
};

export const resultSuccess = <TValue>(value: TValue): Result<TValue> => ({
  isSuccess: true,
  value,
});

export const resultError = <TValue = undefined>(error: ValidationError): Result<TValue> => ({
  isSuccess: false,
  error,
});
