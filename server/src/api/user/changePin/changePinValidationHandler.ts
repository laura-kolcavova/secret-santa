import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { createExpressValidatorProblemDetails } from '~/api/utils/expressValidatorHelper';

export const changePinValidationHandler = [
  param('email').isEmail().isLength({ max: 256 }),
  body('newPin').matches(/^[0-9]{4}$/),
  (req: Request, res: Response, next: NextFunction) => {
    const validaitonResult = validationResult(req);

    if (!validaitonResult.isEmpty()) {
      const problemDetails = createExpressValidatorProblemDetails(validaitonResult.array(), req);

      res.status(400).json(problemDetails);

      return;
    }

    next();
  },
];
