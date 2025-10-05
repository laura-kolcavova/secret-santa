import { Request, Response, NextFunction, Router } from 'express';
import { userManager } from '~/application/user/services/userManager';
import { ProfileDto } from './ProfileDto';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';

export const mapGetProfile = (router: Router) => {
  router.get('/profile', userAuthorizationHandler, handle);
};

const handle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser } = req;

    const user = userManager.findByEmail(loggedUser!.email, abortSignal);

    if (!user) {
      res.status(204).send();

      return;
    }

    const myProfileDto: ProfileDto = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      hobbies: [...user.hobbies],
    };

    res.status(200).json(myProfileDto);
  } catch (error) {
    next(error);
  }
};
