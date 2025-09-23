import { IdentityUser } from '~/application/user/models/IdentityUser';
import { Response, CookieOptions } from 'express';
import { userTokenGenerator } from '~/application/user/services/userTokenGenerator';
import { COOKIE_USER_AUTHENTICATION_NAME } from '~/application/user/constants';

export const signInUser = (res: Response, user: IdentityUser) => {
  const userToken = userTokenGenerator.generateUserToken(user);

  const oneDayInMs = 24 * 60 * 60 * 1000;

  const authProperties: CookieOptions = {
    maxAge: oneDayInMs,
    httpOnly: true,
    secure: true, // TODO true on prod
    sameSite: 'none',
  };

  console.log(userToken);
  res.cookie(COOKIE_USER_AUTHENTICATION_NAME, userToken, authProperties);
};
