import { Request, Response, NextFunction, Router } from 'express';
import { generateCsrfToken } from '~/api/shared/middlewares/csrfProtectionHandler';

export const mapGetCsrfToken = (router: Router) => {
  router.get('/csrf-token', handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseDto = {
      csrfToken: generateCsrfToken(req, res),
    };

    res.json(responseDto);
  } catch (error) {
    next(error);
  }
};
