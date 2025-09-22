import { ValidationError } from 'express-validator';
import { ProblemDetails } from '../shared/ProblemDetails';
import { Request } from 'express';

export const createExpressValidatorProblemDetails = (
  validationErrors: ValidationError[],
  req: Request,
) => {
  const problemDetails: ProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
    title: 'Bad Request',
    status: 400,
    detail: 'One or more validation errors occured',
    instance: `${req.method} ${req.url}`,
    errors: [...validationErrors],
  };

  return problemDetails;
};
