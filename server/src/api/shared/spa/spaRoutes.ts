import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import proxy from 'express-http-proxy';
import cors from 'cors';

export const mapProxyToSpaDevelopmentServer = (
  app: Application,
  proxyToSpaDevelopmentServerUrl: string,
) => {
  // cors are not needed - maybe because of the express-http-proxy nuget
  // app.use(cors({ origin: proxyToSpaDevelopmentServerUrl, credentials: true }));

  app.use('/', proxy(proxyToSpaDevelopmentServerUrl));
};

export const mapSpaStaticFiles = (app: Application, spaStaticFilesRootPath: string) => {
  app.use(express.static(spaStaticFilesRootPath));

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    try {
      const indexPath = path.join(spaStaticFilesRootPath, 'index.html');

      res.sendFile(indexPath);
    } catch (error) {
      next(error);
    }
  });
};
