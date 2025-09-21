import { Request, Response, NextFunction } from 'express';
import { NewProfileRequestDto } from './NewProfileRequestDto';
import { identityService } from '~/application/user/services/identityService';
import { asProblemDetails } from '~/api/utils/validationErrorHelper';

export const NEW_PROFILE_PATH = '/new-profile';

export const handleNewProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProfileRequest = req.body as NewProfileRequestDto;

    const registerResult = identityService.register(
      newProfileRequest.email,
      newProfileRequest.pin,
      newProfileRequest.firstName,
      newProfileRequest.lastName,
      newProfileRequest.department,
      newProfileRequest.hobbies,
    );

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
