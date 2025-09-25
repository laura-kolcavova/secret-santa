import { Request, Response, NextFunction, Router } from 'express';

import { LoggedUserDto } from './LoggedUserDto';
import { userAuthenticationHandler } from '~/api/shared/middlewares/userAuthenticationHandler';

export const mapGetLoggedUser = (router: Router) => {
  router.get('/logged', userAuthenticationHandler, handleGetLoggedUser);
};

const handleGetLoggedUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(204).send();

      return;
    }

    const userTokenPayload = req.user;

    const loggedUserDto: LoggedUserDto = {
      email: userTokenPayload.email,
      fullName: userTokenPayload.fullName,
      fistName: userTokenPayload.firstName,
      lastName: userTokenPayload.lastName,
    };

    res.status(200).json(loggedUserDto);

    next();
  } catch (error) {
    next(error);
  }
};
