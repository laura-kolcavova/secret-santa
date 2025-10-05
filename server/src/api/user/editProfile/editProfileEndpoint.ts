import { Request, Response, NextFunction, Router } from 'express';
import { EditProfileRequestDto } from './EditProfileRequestDto';
import { editProfileService } from '~/application/user/services/editProfileService';
import { editProfileValidation } from './editProfileValidation';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';

export const mapEditProfile = (router: Router) => {
  router.put('/profile', userAuthorizationHandler, editProfileValidation, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser, body } = req;

    const editProfileRequest = body as EditProfileRequestDto;

    const loginResult = editProfileService.editProfile(
      loggedUser!.email,
      editProfileRequest.firstName,
      editProfileRequest.lastName,
      editProfileRequest.department,
      editProfileRequest.hobbies,
      abortSignal,
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
