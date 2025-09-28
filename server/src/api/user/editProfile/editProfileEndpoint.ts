import { Request, Response, NextFunction, Router } from 'express';
import { EditProfileRequestDto } from './EditProfileRequestDto';
import { editProfileService } from '~/application/user/services/editProfileService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { editProfileValidation } from './editProfileValidation';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';

export const mapEditProfile = (router: Router) => {
  router.put('/profile', userAuthorizationHandler, editProfileValidation, handleEditProfile);
};

const handleEditProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user!.email;

    const editProfileRequest = req.body as EditProfileRequestDto;

    const loginResult = editProfileService.editProfile(
      email,
      editProfileRequest.firstName,
      editProfileRequest.lastName,
      editProfileRequest.department,
      editProfileRequest.hobbies,
    );

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
