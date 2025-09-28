import { Application, Router } from 'express';
import { mapGetUserDrawGroup } from './getUserDrawGroup/getUserDrawGroupEndpoint';
import { mapJoinDrawGroup } from './joinDrawGroup/joinDrawGroupEndpoint';

export const mapDrawGroupsRoutes = (app: Application) => {
  const router = Router();

  mapGetUserDrawGroup(router);
  mapJoinDrawGroup(router);

  app.use('/api/draw-groups', router);
};
