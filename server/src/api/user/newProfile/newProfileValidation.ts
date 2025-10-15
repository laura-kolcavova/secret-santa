import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const newProfileValidation = [
  body('email').notEmpty().isEmail().trim().escape().toLowerCase().isLength({ max: 256 }),
  body('pin').matches(/^[0-9]{4}$/),
  body('firstName').notEmpty().isString().escape().isLength({ max: 256 }),
  body('lastName').notEmpty().isString().escape().isLength({ max: 256 }),
  body('department').notEmpty().isString().escape().isLength({ max: 256 }),
  body('hobbies').isArray(),
  body('hobbies.*').isString().escape().isLength({ max: 256 }),
  validationHandler,
];
