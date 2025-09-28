import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { drawParticipantService } from '~/application/drawGroups/services/drawParticipantService';
import { drawParticipantValidation } from './drawParticipantValidation';
import { DrawParticipantParams } from './DrawParticipantParams';
import { DrawParticipantResponseDto } from './DrawParticipantResponseDto';
import { userManager } from '~/application/user/services/userManager';
import { userErrors } from '~/application/user/userErrors';
import { getFullName } from '~/application/user/utils/userHelpers';

export const mapDrawParticipant = (router: Router) => {
  router.post('/:drawGroupGuid/draw', userAuthorizationHandler, drawParticipantValidation, handle);
};

const handle = (req: Request<DrawParticipantParams>, res: Response, next: NextFunction) => {
  try {
    const drawGroupGuid = req.params.drawGroupGuid;
    const participantEmail = req.user!.email;

    const drawParticipantResult = drawParticipantService.drawParticipant(
      drawGroupGuid,
      participantEmail,
    );

    if (!drawParticipantResult.isSuccess) {
      const problemDetails = createProblemDetails(drawParticipantResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    const drawnParticipant = drawParticipantResult.value!;

    const drawnParticipantAsUser = userManager.findByEmail(drawnParticipant.email);

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
