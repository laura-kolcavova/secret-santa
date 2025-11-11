import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';

import { joinDrawGroupService } from '~/application/drawGroups/services/joinDrawGroupService';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import userRoles from '~/application/user/models/userRoles';
import { editDrawGroupValidation } from './editDrawGroupValidation';
import { EditDrawGroupRequestDto } from './EditDrawGroupRequestDto';

export const mapEditDrawGroup = (router: Router) => {
  router.put(
    '/:drawGroupGuid/edit',
    userAuthorizationWithRolesHandler(userRoles.DrawGroupManager),
    editDrawGroupValidation,
    handle,
  );
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, body } = req;

    const editDrawGroupRequest = body as EditDrawGroupRequestDto;

    const joinDrawGroupResult = joinDrawGroupService.joinDrawGroup(
      params.drawGroupGuid,
      loggedUser!.email,
      abortSignal,
    );

    if (!joinDrawGroupResult.isSuccess) {
      const problemDetails = createProblemDetails(joinDrawGroupResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
