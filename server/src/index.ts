import express from 'express';
import cors from 'cors';

import userRoutes from './api/user/userRoutes';
import { errorHandler } from './api/middlewares/errorHandler';
import { appConfig } from './config/appConfig';

const app = express();

app.use(cors());

app.use('/api/user', userRoutes);

app.use(errorHandler);

const port = appConfig.port;

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
