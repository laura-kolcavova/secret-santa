import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const newProfileValidation = [
  body('email').isEmail().normalizeEmail(),
  body('pin').matches(/^[0-9]{4}$/),
  body('firstName').notEmpty().escape(),
  body('lastName').notEmpty().escape(),
  body('department').notEmpty().escape(),
  validationHandler,
];
