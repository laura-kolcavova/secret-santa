import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('pin').matches(/^[0-9]{4}$/),
  validationHandler,
];
