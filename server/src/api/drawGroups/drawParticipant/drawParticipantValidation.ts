import { param } from 'express-validator';
import { validationHandler } from '~/api/shared/middlewares/validationHandler';

export const drawParticipantValidation = [param('drawGroupGuid').notEmpty(), validationHandler];
