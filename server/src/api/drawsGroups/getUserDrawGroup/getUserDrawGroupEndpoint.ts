import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import { UserDrawGroupDto } from './UserDrawGroupDto';

export const mapGetUserDrawGroup = (router: Router) => {
  router.get('/user', userAuthorizationHandler, handleGetUserDrawGroup);
};

const handleGetUserDrawGroup = (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentYear = new Date().getFullYear();

    const drawGroup = drawGroupManager.getDrawGroupByYear(currentYear);

    if (!drawGroup) {
      res.status(204).send();

      return;
    }

    const email = req.user!.email;

    const didUserJoined =
      drawGroup.participants.length > 0 &&
      drawGroup.participants.some((participant) => participant.email === email);

    const userDrawGroupDto: UserDrawGroupDto = {
      name: drawGroup.name,
      participantsCount: drawGroup.participants.length,
      drawStartUtc: drawGroup.drawStartUtc.toISOString(),
      drawEndUtc: drawGroup.drawEndUtc.toISOString(),
      didUserJoined: didUserJoined,
      drawnUser: undefined,
    };

    res.status(200).json(userDrawGroupDto);

    next();
  } catch (error) {
    next(error);
  }
};
