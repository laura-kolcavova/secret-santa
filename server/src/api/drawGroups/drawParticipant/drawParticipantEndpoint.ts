import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawParticipantService } from '~/application/drawGroups/services/drawParticipantService';
import { drawParticipantValidation } from './drawParticipantValidation';
import { DrawParticipantParams } from './DrawParticipantParams';
import { DrawParticipantResponseDto } from './DrawParticipantResponseDto';
import { userManager } from '~/application/user/services/userManager';
import { userErrors } from '~/application/user/userErrors';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import { getFullName } from '~/application/user/models/User';

export const mapDrawParticipant = (router: Router) => {
  router.post('/:drawGroupGuid/draw', userAuthorizationHandler, drawParticipantValidation, handle);
};

const handle = (req: Request<DrawParticipantParams>, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser, params } = req;

    const drawParticipantResult = drawParticipantService.drawParticipant(
      params.drawGroupGuid,
      loggedUser!.email,
      abortSignal,
    );

    if (!drawParticipantResult.isSuccess) {
      const problemDetails = createProblemDetails(drawParticipantResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    const drawnParticipant = drawParticipantResult.value!;

    const drawnParticipantAsUser = userManager.findByEmail(drawnParticipant.email, abortSignal);

    if (!drawnParticipantAsUser) {
      const problemDetails = createProblemDetails(userErrors.notFound(), req);

      res.status(400).json(problemDetails);

      return;
    }

    const drawParticipantResponseDto: DrawParticipantResponseDto = {
      drawnParticipant: {
        email: drawnParticipant.email,
        fullName: getFullName(drawnParticipantAsUser),
        department: drawnParticipantAsUser.department,
        hobbies: [...drawnParticipantAsUser.hobbies],
      },
    };

    res.status(200).json(drawParticipantResponseDto);
  } catch (error) {
    next(error);
  }
};
