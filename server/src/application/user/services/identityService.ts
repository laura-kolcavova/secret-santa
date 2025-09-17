import { LoginResult } from '../models/LoginResult';
import { userManager } from './userManager';

const login = (email: string, pin: string): LoginResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return {
      isSuccess: false,
      error: {
        code: 'User.NotFound',
        message: 'User was not found',
      },
    };
  }

  const userHasValidPin = userManager.checkPin(user, pin);

  if (!userHasValidPin) {
    return {
      isSuccess: false,
      error: {
        code: 'User.PinDoNotMatch',
        message: 'User was not found',
      },
    };
  }

  return {
    isSuccess: true,
  };
};

export const identityService = {
  login,
};
