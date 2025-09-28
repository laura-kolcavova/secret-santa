import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { joinDrawGroupValidation } from './joinDrawGroupValidation';
import { JoinDrawGroupParams } from './JoinDrawGroupParams';
import { joinDrawGroupService } from '~/application/drawGroups/services/joinDrawGroupService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';

export const mapJoinDrawGroup = (router: Router) => {
  router.post(
    '/:drawGroupGuid/join',
    userAuthorizationHandler,
    joinDrawGroupValidation,
    handleJoinDrawGroup,
  );
};

const handleJoinDrawGroup = (
  req: Request<JoinDrawGroupParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const drawGroupGuid = req.params.drawGroupGuid;
    const participantEmail = req.user!.email;

    const joinDrawGroupResult = joinDrawGroupService.joinDrawGroup(drawGroupGuid, participantEmail);

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
