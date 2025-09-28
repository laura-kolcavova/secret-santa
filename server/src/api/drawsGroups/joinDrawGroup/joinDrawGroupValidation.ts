import { param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const joinDrawGroupValidation = [param('drawGroupGuid').notEmpty(), validationHandler];
