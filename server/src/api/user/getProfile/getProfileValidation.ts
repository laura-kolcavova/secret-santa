import { param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const getProfileValidation = [param('email').isEmail().normalizeEmail(), validationHandler];
