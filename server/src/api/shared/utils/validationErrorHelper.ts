import { ValidationError } from '~/application/shared/models/ValidationError';
import { Request } from 'express';
import { ProblemDetails } from '../ProblemDetails';

export const createProblemDetails = (validaitonError: ValidationError, req: Request) => {
  const problemDetails: ProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
    title: 'Bad Request',
    status: 400,
    detail: validaitonError.message,
    instance: `${req.method} ${req.url}`,
    code: validaitonError.code,
  };

  return problemDetails;
};
