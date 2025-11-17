import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import userRoles from '~/application/user/models/userRoles';
import { createDrawGroupValidation } from './createDrawGroupValidation';
import { CreateDrawGroupRequestDto } from './CreateDrawGroupRequestDto';
import { createDrawGroupService } from '~/application/drawGroups/services/createDrawGroupService';
import { CreateDrawGroupResponseDto } from './CreateDrawGroupResponseDto';

export const mapCreateDrawGroup = (router: Router) => {
  router.post(
    '/create',
    userAuthorizationWithRolesHandler(userRoles.DrawGroupManager),
    createDrawGroupValidation,
    handle,
  );
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, body } = req;

    const createDrawGroupRequest = body as CreateDrawGroupRequestDto;

    const createDrawGroupResult = createDrawGroupService.createDrawGroup(
      createDrawGroupRequest.name,
      new Date(createDrawGroupRequest.drawStartUtc),
      new Date(createDrawGroupRequest.drawEndUtc),
      abortSignal,
    );

    if (!createDrawGroupResult.isSuccess) {
      const problemDetails = createProblemDetails(createDrawGroupResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    const drawGroupGuid = createDrawGroupResult.value!;

    const responseDto: CreateDrawGroupResponseDto = {
      drawGroupGuid: drawGroupGuid,
    };

    res.status(200).json(responseDto);
  } catch (error) {
    next(error);
  }
};
