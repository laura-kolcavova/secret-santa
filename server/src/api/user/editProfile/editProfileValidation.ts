import { body } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const editProfileValidation = [
  body('firstName').notEmpty().isString().isLength({ max: 256 }),
  body('lastName').notEmpty().isString().isLength({ max: 256 }),
  body('department').notEmpty().isString().isLength({ max: 256 }),
  body('hobbies').isArray(),
  body('hobbies.*').isString().isLength({ max: 256 }),
  validationHandler,
];
