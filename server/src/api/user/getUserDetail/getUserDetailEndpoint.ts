import { Request, Response, NextFunction } from 'express';
import { UserDetailDto } from './UserDetailDto';
import { userManager } from '~/application/user/services/userManager';
import { GetUserDetailParms } from './GetUserDetailParams';

export const GET_USER_DETAIL_PATH = '/:email/detail';

export const handleGetUserDetail = async (
  req: Request<GetUserDetailParms>,
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

    const userDetailDto: UserDetailDto = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      hobbies: [...user.hobbies],
    };

    res.status(200).json(userDetailDto);

    next();
  } catch (error) {
    next(error);
  }
};
