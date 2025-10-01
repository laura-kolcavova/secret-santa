import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { signOutUser } from '~/api/shared/utils/userAuthenticationHelper';

export const mapLogout = (router: Router) => {
  router.post('/logout', userAuthorizationHandler, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    signOutUser(res);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
