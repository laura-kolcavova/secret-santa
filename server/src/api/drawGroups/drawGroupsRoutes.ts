import { Application, Router } from 'express';
import { mapGetUserDrawGroup } from './getUserDrawGroup/getUserDrawGroupEndpoint';
import { mapJoinDrawGroup } from './joinDrawGroup/joinDrawGroupEndpoint';
import { mapDrawParticipant } from './drawParticipant/drawParticipantEndpoint';

export const mapDrawGroupsRoutes = (app: Application) => {
  const router = Router();

  mapGetUserDrawGroup(router);
  mapJoinDrawGroup(router);
  mapDrawParticipant(router);

  app.use('/api/draw-groups', router);
};
