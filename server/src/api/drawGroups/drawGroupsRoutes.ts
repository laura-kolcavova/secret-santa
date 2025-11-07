import { Application, Router } from 'express';
import { mapJoinDrawGroup } from './joinDrawGroup/joinDrawGroupEndpoint';
import { mapDrawParticipant } from './drawParticipant/drawParticipantEndpoint';
import { mapGetUserDrawGroupList } from './getUserDrawGroupList/getUserDrawGroupListEndpoint';

export const mapDrawGroupsRoutes = (app: Application) => {
  const router = Router();

  mapGetUserDrawGroupList(router);
  mapJoinDrawGroup(router);
  mapDrawParticipant(router);

  app.use('/api/draw-groups', router);
};
