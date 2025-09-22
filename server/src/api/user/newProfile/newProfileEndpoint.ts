import { Request, Response, NextFunction, Router } from 'express';
import { NewProfileRequestDto } from './NewProfileRequestDto';
import { newProfileService } from '~/application/user/services/newProfileService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { newProfileValidationHandler } from './newProfileValidationHandler';

export const mapNewProfile = (router: Router) => {
  router.post('/new-profile', newProfileValidationHandler, handleNewProfile);
};

const handleNewProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProfileRequest = req.body as NewProfileRequestDto;

    const newProfileResult = newProfileService.newProfile({
      email: newProfileRequest.email,
      pin: newProfileRequest.pin,
      firstName: newProfileRequest.firstName,
      lastName: newProfileRequest.lastName,
      department: newProfileRequest.department,
      hobbies: newProfileRequest.hobbies,
    });

    if (!newProfileResult.isSuccess) {
      const problemDetails = createProblemDetails(newProfileResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
