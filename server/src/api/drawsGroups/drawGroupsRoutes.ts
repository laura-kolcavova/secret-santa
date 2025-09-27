import { Application, Router } from 'express';
import { mapGetUserDrawGroup } from './getUserDrawGroup/getUserDrawGroupEndpoint';

export const mapDrawGroupsRoutes = (app: Application) => {
  const router = Router();

  mapGetUserDrawGroup(router);

  app.use('/api/draw-groups', router);
};
