import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import { mapUsersEndpoints } from './api/user/usersRoutes';
import { exceptionHandler } from './api/shared/middlewares/exceptionHandler';
import { appConfig } from './config/appConfig';
import { mapDrawGroupsRoutes } from './api/drawGroups/drawGroupsRoutes';
import path from 'path';
import { mapProxyToSpaDevelopmentServer, mapSpaStaticFiles } from './api/shared/spa/spaRoutes';
import { ensureDatabaseDeployed } from './persistence/shared/databaseDeploy';
import { seedDatabase } from './persistence/shared/databaseSeed';
import { abortSignalHandler } from './api/shared/middlewares/abortSignalHandler';

const app = express();

app.use(json());
app.use(cookieParser());

app.use(abortSignalHandler);

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

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
