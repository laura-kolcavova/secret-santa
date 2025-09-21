import { Request, Response, NextFunction, Router } from 'express';
import { asProblemDetails } from '~/api/utils/validationErrorHelper';
import { EditProfileRequestDto } from './EditProfileRequestDto';
import { EditProfileParams } from './EditProfileParams';
import { userService } from '~/application/user/services/userService';

export const mapEditProfile = (router: Router) => {
  router.put('/:email/profile', handleEditProfile);
};

const handleEditProfile = (req: Request<EditProfileParams>, res: Response, next: NextFunction) => {
  try {
    const editProfileRequest = req.body as EditProfileRequestDto;

    const loginResult = userService.editProfile({
      email: req.params.email,
      firstName: editProfileRequest.firstName,
      lastName: editProfileRequest.lastName,
      department: editProfileRequest.department,
      hobbies: editProfileRequest.hobbies,
    });

    if (!loginResult.isSuccess) {
      const problemDetails = asProblemDetails(loginResult.error!, req);

      res.status(400).json(problemDetails);

      next();

      return;
    }

    res.status(204).send();

    next();
  } catch (error) {
    next(error);
  }
};
