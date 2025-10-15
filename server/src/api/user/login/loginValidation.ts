import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const loginValidation = [
  body('email').notEmpty().isEmail().trim().escape().toLowerCase().isLength({ max: 256 }),
  body('pin').matches(/^[0-9]{4}$/),
  validationHandler,
];
