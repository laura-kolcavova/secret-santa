import { Request, Response, NextFunction, Router } from 'express';
import { signOutUser } from '~/api/utils/userAuthenticationHelper';

export const mapLogout = (router: Router) => {
  router.post('/logout', handleLogout);
};

const handleLogout = (req: Request, res: Response, next: NextFunction) => {
  try {
    signOutUser(res);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
