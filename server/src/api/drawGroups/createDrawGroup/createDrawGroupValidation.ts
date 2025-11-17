import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const createDrawGroupValidation = [
  body('name').notEmpty().isString().escape().isLength({ max: 256 }),
  body('drawStartUtc').notEmpty().isISO8601(),
  body('drawEndUtc').notEmpty().isISO8601(),
  validationHandler,
];
