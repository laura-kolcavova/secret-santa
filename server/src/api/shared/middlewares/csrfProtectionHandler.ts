import csrf from 'csurf';
import { COOKIE_XSRF_TOKEN_NAME } from '../constants';

export const csrfProtectionHandler = csrf({
  cookie: {
    key: COOKIE_XSRF_TOKEN_NAME,
    sameSite: 'strict',
    httpOnly: false,
  },
});
