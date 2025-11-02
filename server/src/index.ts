import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import https from 'https';

import { mapUsersEndpoints } from './api/user/usersRoutes';
import { exceptionHandler } from './api/shared/middlewares/exceptionHandler';
import { appConfig } from './config/appConfig';
import { mapDrawGroupsRoutes } from './api/drawGroups/drawGroupsRoutes';
import { mapProxyToSpaDevelopmentServer, mapSpaStaticFiles } from './api/shared/spa/spaRoutes';
import { ensureDatabaseDeployed } from './persistence/shared/databaseDeploy';
import { seedDatabase } from './persistence/shared/databaseSeed';
import { abortSignalHandler } from './api/shared/middlewares/abortSignalHandler';
import { csrfProtectionHandler } from './api/shared/middlewares/csrfProtectionHandler';
import { mapSettingsRoutes } from './api/settings/settingsRoutes';
import { loadHttpsCertificates } from './api/shared/https/httpsCertificates';

const app = express();

app.use(json());
app.use(cookieParser());

app.use(csrfProtectionHandler);
app.use(abortSignalHandler);

mapSettingsRoutes(app);
mapUsersEndpoints(app);
mapDrawGroupsRoutes(app);

if (appConfig.useProxyToSpaDevelopmentServer) {
  mapProxyToSpaDevelopmentServer(app, appConfig.proxyToSpaDevelopmentServerUrl);
} else {
  const spaStaticFilesRootPath = path.join(__dirname, appConfig.spaStaticFilesRootPath);

  mapSpaStaticFiles(app, spaStaticFilesRootPath);
}

app.use(exceptionHandler);

ensureDatabaseDeployed(appConfig.sqliteDbFilePath);
seedDatabase(appConfig.sqliteDbFilePath);

const port = appConfig.port;

if (appConfig.useHttps) {
  const httpsCertificates = loadHttpsCertificates();

  const httpsServer = https.createServer(httpsCertificates, app);

  httpsServer.listen(port, () => {
    console.log(`The server is running at https://localhost:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
}
