import { body, param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const editProfileValidation = [
  param('email').isEmail().normalizeEmail(),
  body('firstName').notEmpty().escape(),
  body('lastName').notEmpty().escape(),
  body('department').notEmpty().escape(),
  validationHandler,
];
