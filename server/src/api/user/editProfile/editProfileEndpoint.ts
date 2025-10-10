import { Request, Response, NextFunction, Router } from 'express';
import { EditProfileRequestDto } from './EditProfileRequestDto';
import { editProfileService } from '~/application/user/services/editProfileService';
import { editProfileValidation } from './editProfileValidation';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import { signInUser } from '~/api/shared/utils/userAuthenticationHelper';
import { LoggedUserDto } from '../getLoggedUser/LoggedUserDto';
import { getFullName } from '~/application/user/models/User';
import { csrfProtectionHandler } from '~/api/shared/middlewares/csrfProtectionHandler';

export const mapEditProfile = (router: Router) => {
  router.put(
    '/profile',
    userAuthorizationHandler,
    editProfileValidation,
    csrfProtectionHandler,
    handle,
  );
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser, body } = req;

    const editProfileRequest = body as EditProfileRequestDto;

    const editProfileResult = editProfileService.editProfile(
      loggedUser!.email,
      editProfileRequest.firstName,
      editProfileRequest.lastName,
      editProfileRequest.department,
      editProfileRequest.hobbies,
      abortSignal,
    );

    if (!editProfileResult.isSuccess) {
      const problemDetails = createProblemDetails(editProfileResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    abortSignal.throwIfAborted();

    const user = editProfileResult.value!;

    signInUser(res, user);

    const loggedUserDto: LoggedUserDto = {
      email: user.email,
      fullName: getFullName(user),
      fistName: user.firstName,
      lastName: user.lastName,
    };

    res.status(200).json(loggedUserDto);
  } catch (error) {
    next(error);
  }
};
