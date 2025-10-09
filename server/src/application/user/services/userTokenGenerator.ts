import jwt from 'jsonwebtoken';

import { appConfig } from '~/config/appConfig';
import { User } from '../models/User';
import { createUserTokenPayload } from '../models/UserTokenPayload';

const generateUserToken = (user: User) => {
  const userTokenPayload = createUserTokenPayload(user);

  const userToken = jwt.sign(userTokenPayload, appConfig.jwtSecret, {
    expiresIn: '1d',
  });

  return userToken;
};

export const userTokenGenerator = {
  generateUserToken,
};
