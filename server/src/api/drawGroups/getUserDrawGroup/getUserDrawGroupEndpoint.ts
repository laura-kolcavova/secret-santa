import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import { DrawnParticipantDto, UserDrawGroupDto } from './UserDrawGroupDto';
import { findParticipantByEmail } from '~/application/drawGroups/utils/drawGroupHelpers';
import { userManager } from '~/application/user/services/userManager';
import { getFullName } from '~/application/user/utils/userHelpers';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { userErrors } from '~/application/user/userErrors';

export const mapGetUserDrawGroup = (router: Router) => {
  router.get('/user', userAuthorizationHandler, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentYear = new Date().getFullYear();

    const drawGroup = drawGroupManager.findByYear(currentYear);

    if (!drawGroup) {
      res.status(204).send();

      return;
    }

    const email = req.user!.email;

    const participant = findParticipantByEmail(drawGroup, email);

    let drawnParticipantDto: DrawnParticipantDto | undefined = undefined;

    if (participant && participant.drawnParticipant) {
      const drawnParticipantAsUser = userManager.findByEmail(participant.drawnParticipant.email);

      if (!drawnParticipantAsUser) {
        const problemDetails = createProblemDetails(userErrors.notFound(), req);

        res.status(400).json(problemDetails);

        return;
      }

      drawnParticipantDto = {
        email: participant.drawnParticipant.email,
        fullName: getFullName(drawnParticipantAsUser),
        department: drawnParticipantAsUser.department,
        hobbies: [...drawnParticipantAsUser.hobbies],
      };
    }

    const userDrawGroupDto: UserDrawGroupDto = {
      drawGroup: {
        guid: drawGroup.guid,
        name: drawGroup.name,
        participantsCount: drawGroup.participants.length,
        drawStartUtc: drawGroup.drawStartUtc.toISOString(),
        drawEndUtc: drawGroup.drawEndUtc.toISOString(),
      },
      userStatus: {
        isParticipant: participant !== undefined,
        hasDrawn: participant?.hasDrawn ?? false,
        drawnParticipant: drawnParticipantDto,
      },
    };

    res.status(200).json(userDrawGroupDto);
  } catch (error) {
    next(error);
  }
};
