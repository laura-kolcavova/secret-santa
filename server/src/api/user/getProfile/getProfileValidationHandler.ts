import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { createExpressValidatorProblemDetails } from '~/api/utils/expressValidatorHelper';

export const getProfileValidationHandler = [
  param('email').isEmail(),
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
