import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './api/user/userRoutes';
import { exceptionHandler } from './api/shared/middlewares/exceptionHandler';
import { appConfig } from './config/appConfig';

const app = express();

// app.use(cors());

app.use(cors({ origin: 'http://localhost:3200', credentials: true }));

app.use(json());
app.use(cookieParser());

app.use('/api/user', userRoutes);

app.use(exceptionHandler);

const port = appConfig.port;

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
