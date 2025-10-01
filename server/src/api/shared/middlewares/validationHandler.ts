import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createExpressValidatorProblemDetails } from '../utils/expressValidatorHelper';

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validaitonResult = validationResult(req);

    if (!validaitonResult.isEmpty()) {
      const problemDetails = createExpressValidatorProblemDetails(validaitonResult.array(), req);

      res.status(400).json(problemDetails);

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
