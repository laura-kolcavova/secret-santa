import { Application, Router } from 'express';
import { mapGetCsrfToken } from './getCsrfToken/getCsrfTokenEndpoint';

export const mapSettingsRoutes = (app: Application) => {
  const router = Router();

  mapGetCsrfToken(router);

  app.use('/api/settings', router);
};
