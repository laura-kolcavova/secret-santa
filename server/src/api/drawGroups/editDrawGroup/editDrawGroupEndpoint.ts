import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import userRoles from '~/application/user/models/userRoles';
import { editDrawGroupValidation } from './editDrawGroupValidation';
import { EditDrawGroupRequestDto } from './EditDrawGroupRequestDto';
import { editDrawGroupService } from '~/application/drawGroups/services/editDrawGroupService';

export const mapEditDrawGroup = (router: Router) => {
  router.put(
    '/edit',
    userAuthorizationWithRolesHandler(userRoles.DrawGroupManager),
    editDrawGroupValidation,
    handle,
  );
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, body } = req;

    const editDrawGroupRequest = body as EditDrawGroupRequestDto;

    const editDrawGroupResult = editDrawGroupService.editDrawGroup(
      editDrawGroupRequest.drawGroupGuid,
      editDrawGroupRequest.name,
      new Date(editDrawGroupRequest.drawStartUtc),
      new Date(editDrawGroupRequest.drawEndUtc),
      abortSignal,
    );

    if (!editDrawGroupResult.isSuccess) {
      const problemDetails = createProblemDetails(editDrawGroupResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
