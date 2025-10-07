import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_USER_AUTHENTICATION_NAME } from '~/application/user/constants';
import { UserTokenPayload } from '~/application/user/models/UserTokenPayload';
import { appConfig } from '~/config/appConfig';

export const userAuthenticationHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken: string | undefined = req.cookies[COOKIE_USER_AUTHENTICATION_NAME];

    if (!userToken) {
      next();

      return;
    }

    jwt.verify(userToken, appConfig.jwtSecret, (err, decoded) => {
      if (err) {
        next();

        return;
      }

      const userTokenPayload = decoded as UserTokenPayload;

      req.loggedUser = userTokenPayload;

      next();
    });
  } catch (error) {
    next(error);
  }
};
