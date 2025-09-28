import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { mapUsersEndpoints } from './api/user/usersRoutes';
import { exceptionHandler } from './api/shared/middlewares/exceptionHandler';
import { appConfig } from './config/appConfig';
import { mapDrawGroupsRoutes } from './api/drawGroups/drawGroupsRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:3200', credentials: true }));

app.use(json());
app.use(cookieParser());

mapUsersEndpoints(app);
mapDrawGroupsRoutes(app);

app.use(exceptionHandler);

const port = appConfig.port;

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
