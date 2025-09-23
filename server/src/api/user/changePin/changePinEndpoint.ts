import { Request, Response, NextFunction, Router } from 'express';
import { editProfileService } from '~/application/user/services/editProfileService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { changePinValidationHandler } from './changePinValidationHandler';
import { ChangePinParams } from './ChangePinParams';
import { ChangePinRequestDto } from './ChangePinRequestDto';
import { changePinService } from '~/application/user/services/changePinService';

export const mapChangePin = (router: Router) => {
  router.put('/:email/change-pin', changePinValidationHandler, handleEditProfile);
};

const handleEditProfile = (req: Request<ChangePinParams>, res: Response, next: NextFunction) => {
  try {
    const changePinRequest = req.body as ChangePinRequestDto;

    const changePinResult = changePinService.changePin(req.params.email, changePinRequest.newPin);

    if (!changePinResult.isSuccess) {
      const problemDetails = createProblemDetails(changePinResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
