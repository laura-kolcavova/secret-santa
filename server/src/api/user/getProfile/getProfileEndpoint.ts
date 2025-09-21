import { Request, Response, NextFunction, Router } from 'express';
import { userManager } from '~/application/user/services/userManager';
import { GetProfileParams } from './GetProfileParams';
import { ProfileDto } from './ProfileDto';

export const mapGetProfile = (router: Router) => {
  router.get('/:email/profile', handleGetProfile);
};

const handleGetProfile = async (
  req: Request<GetProfileParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = userManager.findByEmail(req.params.email);

    if (!user) {
      res.status(204).send();

      next();

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

    next();
  } catch (error) {
    next(error);
  }
};
