import jwt from 'jsonwebtoken';

import { appConfig } from '~/config/appConfig';
import { IdentityUser } from '../models/IdentityUser';
import { createUserTokenPayload } from '../utils/authenticationHelper';

const generateUserToken = (user: IdentityUser) => {
  const userTokenPayload = createUserTokenPayload(user);

  const userToken = jwt.sign(userTokenPayload, appConfig.jwtSecret, {
    expiresIn: '1d',
  });

  return userToken;
};

export const userTokenGenerator = {
  generateUserToken,
};
