import jwt from 'jsonwebtoken';

import { appConfig } from '~/config/appConfig';
import { createUserTokenPayload } from '../utils/authenticationHelper';
import { User } from '../models/User';

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
