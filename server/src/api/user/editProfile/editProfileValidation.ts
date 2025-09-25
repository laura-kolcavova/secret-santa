import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const editProfileValidation = [
  body('firstName').notEmpty().escape(),
  body('lastName').notEmpty().escape(),
  body('department').notEmpty().escape(),
  validationHandler,
];
