import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const editDrawGroupValidation = [
  body('drawGroupGuid').notEmpty(),
  body('name').notEmpty().isString(),
  body('drawStartUtc').notEmpty().isISO8601(),
  body('drawEndUtc').notEmpty().isISO8601(),
  validationHandler,
];
