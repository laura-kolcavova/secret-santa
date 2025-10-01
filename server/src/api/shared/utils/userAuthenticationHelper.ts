import { IdentityUser } from '~/application/user/models/User';
import { Response, CookieOptions } from 'express';
import { userTokenGenerator } from '~/application/user/services/userTokenGenerator';
import { COOKIE_USER_AUTHENTICATION_NAME } from '~/application/user/constants';

export const signInUser = (res: Response, user: IdentityUser) => {
  const userToken = userTokenGenerator.generateUserToken(user);

  const oneDayInMs = 24 * 60 * 60 * 1000;

  const authProperties: CookieOptions = {
    maxAge: oneDayInMs,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  res.cookie(COOKIE_USER_AUTHENTICATION_NAME, userToken, authProperties);
};

export const signOutUser = (res: Response) => {
  res.clearCookie(COOKIE_USER_AUTHENTICATION_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
};
