import jwt from 'jsonwebtoken';

import { appConfig } from '~/config/appConfig';
import { IdentityUser } from '../models/IdentityUser';
import { getUserClaims } from '../utils/authenticationHelper';

const generateUserToken = (user: IdentityUser) => {
  const payload = getUserClaims(user);

  const userToken = jwt.sign(payload, appConfig.jwtSecret, {
    expiresIn: '1d',
  });

  return userToken;
};

export const userTokenGenerator = {
  generateUserToken,
};
