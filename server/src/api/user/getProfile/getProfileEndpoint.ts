import { Request, Response, NextFunction, Router } from 'express';
import { userManager } from '~/application/user/services/userManager';
import { ProfileDto } from './ProfileDto';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';

export const mapGetProfile = (router: Router) => {
  router.get('/profile', userAuthorizationHandler, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser } = req;

    const profileDto = getProfile(loggedUser!.email, abortSignal);

    if (!profileDto) {
      res.status(204).send();

      return;
    }

    res.status(200).json(profileDto);
  } catch (error) {
    next(error);
  }
};

const getProfile = (email: string, abortSignal: AbortSignal): ProfileDto | undefined => {
  const user = userManager.findByEmail(email, abortSignal);

  if (!user) {
    return undefined;
  }

  const profileDto: ProfileDto = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    department: user.department,
    hobbies: [...user.hobbies],
  };

  return profileDto;
};
