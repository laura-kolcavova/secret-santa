import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const editDrawGroupValidation = [
  body('drawGroupGuid').notEmpty(),
  body('name').notEmpty().isString(),
  body('drawStartUtc').notEmpty().isDate(),
  body('drawEndUtc').notEmpty().isDate(),
  validationHandler,
];
