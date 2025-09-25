import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const changePinValidation = [
  body('currentPin').matches(/^[0-9]{4}$/),
  body('newPin').matches(/^[0-9]{4}$/),
  validationHandler,
];
