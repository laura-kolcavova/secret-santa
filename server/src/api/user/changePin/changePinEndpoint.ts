import { Request, Response, NextFunction, Router } from 'express';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { ChangePinRequestDto } from './ChangePinRequestDto';
import { changePinService } from '~/application/user/services/changePinService';
import { changePinValidation } from './changePinValidation';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';

export const mapChangePin = (router: Router) => {
  router.put('/change-pin', userAuthorizationHandler, changePinValidation, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user!.email;

    const changePinRequest = req.body as ChangePinRequestDto;

    const changePinResult = changePinService.changePin(
      email,
      changePinRequest.currentPin,
      changePinRequest.newPin,
    );

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
