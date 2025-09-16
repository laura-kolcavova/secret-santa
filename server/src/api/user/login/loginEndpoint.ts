import { Request, Response, NextFunction } from 'express';

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
