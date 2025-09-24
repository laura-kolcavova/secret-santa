import { IdentityUser } from '../models/IdentityUser';
import { UserTokenPayload } from '../models/UserTokenPayload';

export const createUserTokenPayload = (user: IdentityUser): UserTokenPayload => {
  return {
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
