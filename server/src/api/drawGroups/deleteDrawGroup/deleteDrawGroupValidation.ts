import { param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const deleteDrawGroupValidation = [param('drawGroupGuid').notEmpty(), validationHandler];
