import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationWithRolesHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import { DrawGroupListDto, DrawGroupListItemDto } from './DrawGroupListDto';
import UserRoles from '~/application/user/models/userRoles';

export const mapGetDrawGroupList = (router: Router) => {
  router.get('/list', userAuthorizationWithRolesHandler(UserRoles.DrawGroupManager), handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal } = req;

    const drawGroupListDto = getDrawGroupList(abortSignal);

    if (drawGroupListDto.drawGroups.length === 0) {
      res.status(204).send();

      return;
    }

    res.status(200).json(drawGroupListDto);
  } catch (error) {
    next(error);
  }
};

const getDrawGroupList = (abortSignal: AbortSignal): DrawGroupListDto => {
  const drawGroups = drawGroupManager.getAll(abortSignal);

  const drawGroupListItemDtos = drawGroups.map<DrawGroupListItemDto>((drawGroup) => ({
    guid: drawGroup.guid,
    name: drawGroup.name,
    participantsCount: drawGroup.participants.length,
    drawStartUtc: drawGroup.drawStartUtc.toISOString(),
    drawEndUtc: drawGroup.drawEndUtc.toISOString(),
  }));

  const drawGroupListDto: DrawGroupListDto = {
    drawGroups: drawGroupListItemDtos,
  };

  return drawGroupListDto;
};
