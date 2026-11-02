import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const newProfileValidation = [
  body('email').notEmpty().isEmail().isLength({ max: 256 }),
  body('pin').matches(/^[0-9]{4}$/),
  body('firstName').notEmpty().isString().isLength({ max: 256 }),
  body('lastName').notEmpty().isString().isLength({ max: 256 }),
  body('department').notEmpty().isString().isLength({ max: 256 }),
  body('hobbies').isArray(),
  body('hobbies.*').isString().isLength({ max: 256 }),
  validationHandler,
];
