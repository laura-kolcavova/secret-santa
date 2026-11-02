import { doubleCsrf } from 'csrf-csrf';
import { COOKIE_XSRF_TOKEN_NAME } from '../constants';
import { appConfig } from '~/config/appConfig';

const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => appConfig.jwtSecret,
  getSessionIdentifier: () => '',
  cookieName: COOKIE_XSRF_TOKEN_NAME,
  cookieOptions: {
    sameSite: 'strict',
    secure: appConfig.useHttps,
  },
});

export const csrfProtectionHandler = doubleCsrfProtection;

export { generateCsrfToken };
