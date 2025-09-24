import { Request, Response, NextFunction, Router } from 'express';
import { COOKIE_USER_AUTHENTICATION_NAME } from '~/application/user/constants';
import jwt from 'jsonwebtoken';
import { appConfig } from '~/config/appConfig';
import { UserTokenPayload } from '~/application/user/models/UserTokenPayload';
import { LoggedUserDto } from './LoggedUserDto';

export const mapGetLoggedUser = (router: Router) => {
  router.get('/logged', handleGetLoggedUser);
};

const handleGetLoggedUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken: string | undefined = req.cookies[COOKIE_USER_AUTHENTICATION_NAME];

    if (!userToken) {
      res.status(204).send();

      return;
    }

    jwt.verify(userToken, appConfig.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(204).send();
      }

      const userTokenPayload = decoded as UserTokenPayload;

      const loggedUserDto: LoggedUserDto = {
        email: userTokenPayload.email,
        fullName: userTokenPayload.fullName,
        fistName: userTokenPayload.firstName,
        lastName: userTokenPayload.lastName,
      };

      res.status(200).json(loggedUserDto);

      next();
    });
  } catch (error) {
    next(error);
  }
};
