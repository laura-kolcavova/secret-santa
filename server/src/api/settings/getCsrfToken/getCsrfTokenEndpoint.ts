import { Request, Response, NextFunction, Router } from 'express';

export const mapGetCsrfToken = (router: Router) => {
  router.get('/csrf-token', handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseDto = {
      csrfToken: req.csrfToken(),
    };

    res.json(responseDto);
  } catch (error) {
    next(error);
  }
};
