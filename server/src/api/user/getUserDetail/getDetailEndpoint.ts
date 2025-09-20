import { Request, Response, NextFunction } from 'express';
import { UserDetailDto } from './UserDetailDto';

export const GET_USER_DETAIL_PATH = '/:email/detail';

export const handleGetUserDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // your code here
    const userDetailDto: UserDetailDto = {
      email: 'laura.kolcavova@email.cz',
      firstName: 'Laura',
      lastName: 'Kolčavová',
      department: 'C',
      hobbies: ['Books', 'Gaming'],
    };

    res.status(200).json(userDetailDto);

    next();
  } catch (error) {
    next(error);
  }
};
