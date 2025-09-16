import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
