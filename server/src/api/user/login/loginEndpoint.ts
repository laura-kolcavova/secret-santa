import { Request, Response, NextFunction, Router } from 'express';
import { LoginRequestDto } from './LoginRequestDto';
import { loginService } from '~/application/user/services/loginService';
import { loginValidation } from './loginValidation';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import { signInUser } from '~/api/shared/utils/userAuthenticationHelper';

export const mapLogin = (router: Router) => {
  router.post('/login', loginValidation, handle);
};

const handle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, body } = req;

    const loginRequest = body as LoginRequestDto;

    const loginResult = loginService.login(loginRequest.email, loginRequest.pin, abortSignal);

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
