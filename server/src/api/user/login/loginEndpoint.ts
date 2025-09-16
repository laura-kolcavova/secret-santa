import { Request, Response, NextFunction } from 'express';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    throw new Error('test');
    res.status(204).send();
    next();
  } catch (error) {
    next(error);
  }
};
