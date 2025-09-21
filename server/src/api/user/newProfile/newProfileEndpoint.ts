import { Request, Response, NextFunction, Router } from 'express';
import { NewProfileRequestDto } from './NewProfileRequestDto';
import { asProblemDetails } from '~/api/utils/validationErrorHelper';
import { userService } from '~/application/user/services/userService';

export const mapNewProfile = (router: Router) => {
  router.post('/new-profile', handleNewProfile);
};

const handleNewProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProfileRequest = req.body as NewProfileRequestDto;

    const registerResult = userService.newProfile({
      email: newProfileRequest.email,
      pin: newProfileRequest.pin,
      firstName: newProfileRequest.firstName,
      lastName: newProfileRequest.lastName,
      department: newProfileRequest.department,
      hobbies: newProfileRequest.hobbies,
    });

    if (!registerResult.isSuccess) {
      const problemDetails = asProblemDetails(registerResult.error!, req);

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
