import { Request, Response, NextFunction, Router } from 'express';
import { LoginRequestDto } from './LoginRequestDto';
import { loginService } from '~/application/user/services/loginService';
import { createProblemDetails } from '~/api/utils/validationErrorHelper';
import { loginValidation } from './loginValidation';
import { signInUser } from '~/api/utils/userAuthenticationHelper';

export const mapLogin = (router: Router) => {
  router.post('/login', loginValidation, handleLogin);
};

const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body as LoginRequestDto;

    const loginResult = loginService.login(loginRequest.email, loginRequest.pin);

    if (!loginResult.isSuccess) {
      const problemDetails = createProblemDetails(loginResult.error!, req);

      res.status(400).json(problemDetails);

      return;
    }

    signInUser(res, loginResult.user!);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
