import { NextFunction, Request, Response } from 'express';
import { userAuthenticationHandler } from './userAuthenticationHandler';
import { ProblemDetails } from '../ProblemDetails';

export const userAuthorizationHandler = [
  userAuthenticationHandler,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { loggedUser } = req;

      if (!loggedUser) {
        const problemDetails: ProblemDetails = {
          type: 'https://tools.ietf.org/html/rfc9110#section-15.5.2',
          title: 'Unauthorized',
          status: 401,
          detail: 'Authentication required.',
          instance: `${req.method} ${req.url}`,
        };

        res.status(401).json(problemDetails);

        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  },
];
