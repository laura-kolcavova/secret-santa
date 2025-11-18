import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import userRoles from '~/application/user/models/userRoles';
import { deleteDrawGroupValidation } from './deleteDrawGroupValidation';
import { DeleteDrawGroupParams } from './deleteDrawGroupParams';
import { deleteDrawGroupService } from '~/application/drawGroups/services/deleteDrawGroupService';

export const mapDeleteDrawGroup = (router: Router) => {
  router.delete(
    '/:drawGroupGuid',
    userAuthorizationWithRolesHandler(userRoles.DrawGroupManager),
    deleteDrawGroupValidation,
    handle,
  );
};

const handle = (req: Request<DeleteDrawGroupParams>, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, params } = req;

    const deleteDrawGroupResult = deleteDrawGroupService.deleteDrawGroup(
      params.drawGroupGuid,
      abortSignal,
    );

    if (!deleteDrawGroupResult.isSuccess) {
      const problemDetails = createProblemDetails(deleteDrawGroupResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
