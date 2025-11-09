import { param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const getDrawGroupDetailValidation = [param('drawGroupGuid').notEmpty(), validationHandler];
