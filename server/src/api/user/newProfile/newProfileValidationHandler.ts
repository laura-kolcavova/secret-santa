import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { createExpressValidatorProblemDetails } from '~/api/utils/expressValidatorHelper';

export const newProfileValidationHandler = [
  body('email').isEmail(),
  body('pin').matches(/^[0-9]{4}$/),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('department').notEmpty(),
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
