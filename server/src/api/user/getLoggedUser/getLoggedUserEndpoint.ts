import { Request, Response, NextFunction, Router } from 'express';

import { LoggedUserDto } from './LoggedUserDto';
import { userAuthenticationHandler } from '~/api/shared/middlewares/userAuthenticationHandler';

export const mapGetLoggedUser = (router: Router) => {
  router.get('/logged', userAuthenticationHandler, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loggedUser } = req;

    if (!loggedUser) {
      res.status(204).send();

      return;
    }
    const loggedUserDto: LoggedUserDto = {
      email: loggedUser.email,
      fullName: loggedUser.fullName,
      fistName: loggedUser.firstName,
      lastName: loggedUser.lastName,
    };

    res.status(200).json(loggedUserDto);
  } catch (error) {
    next(error);
  }
};
