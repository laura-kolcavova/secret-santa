import { UserTokenPayload } from '~/application/user/models/UserTokenPayload';

declare global {
  namespace Express {
    interface Request {
      abortSignal: AbortSignal;
      loggedUser?: UserTokenPayload;
    }
  }
}
