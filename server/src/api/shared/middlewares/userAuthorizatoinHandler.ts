import { NextFunction, Request, Response } from 'express';
import { userAuthenticationHandler } from './userAuthenticationHandler';
import { ProblemDetails } from '../ProblemDetails';
import { hasRole } from '~/application/user/models/UserTokenPayload';

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

export const userAuthorizationWithRolesHandler = (...roles: string[]) => [
  ...userAuthorizationHandler,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { loggedUser } = req;

      if (roles.length === 0) {
        next();

        return;
      }

      if (!roles.some((role) => hasRole(loggedUser!, role))) {
        const problemDetails: ProblemDetails = {
          type: 'https://tools.ietf.org/html/rfc9110#section-15.5.4',
          title: 'Forbidden',
          status: 403,
          detail: 'You do not have enoguh rights.',
          instance: `${req.method} ${req.url}`,
        };

        res.status(403).json(problemDetails);

        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  },
];
