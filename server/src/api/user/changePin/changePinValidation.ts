import { body, param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const changePinValidation = [
  param('email').isEmail().normalizeEmail(),
  body('newPin').matches(/^[0-9]{4}$/),
  validationHandler,
];
