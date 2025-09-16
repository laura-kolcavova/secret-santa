import { NextFunction, Request, Response } from 'express';
import { ProblemDetails } from '../ProblemDetails';

export const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const problemDetails: ProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc9110#section-15.6.1',
    title: 'Internal Server Error',
    status: 500,
    detail: 'An error occurred while processing your request.',
    instance: `${req.method} ${req.url}`,
  };

  res.status(500).json(problemDetails);
};
