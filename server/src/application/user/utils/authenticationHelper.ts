import { IdentityUser } from '../models/IdentityUser';

export const getUserClaims = (user: IdentityUser): Record<string, string> => {
  return {
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
