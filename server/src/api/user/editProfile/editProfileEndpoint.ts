import { Request, Response, NextFunction, Router } from 'express';
import { EditProfileRequestDto } from './EditProfileRequestDto';
import { EditProfileParams } from './EditProfileParams';
import { editProfileService } from '~/application/user/services/editProfileService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { editProfileValidationHandler } from './editProfileValidationHandler';

export const mapEditProfile = (router: Router) => {
  router.put('/:email/profile', editProfileValidationHandler, handleEditProfile);
};

const handleEditProfile = (req: Request<EditProfileParams>, res: Response, next: NextFunction) => {
  try {
    const editProfileRequest = req.body as EditProfileRequestDto;

    const loginResult = editProfileService.editProfile({
      email: req.params.email,
      firstName: editProfileRequest.firstName,
      lastName: editProfileRequest.lastName,
      department: editProfileRequest.department,
      hobbies: editProfileRequest.hobbies,
    });

    if (!loginResult.isSuccess) {
      const problemDetails = createProblemDetails(loginResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
