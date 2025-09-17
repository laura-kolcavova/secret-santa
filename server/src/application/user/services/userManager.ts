import md5 from 'md5';
import { appConfig } from '~/config/appConfig';
import { mockIdentityUsers } from '../mockIdentityUsers';
import { IdentityUser } from '../models/IdentityUser';

const findByEmail = (email: string): IdentityUser | undefined => {
  const normalizedEmail = email.trim().toLocaleLowerCase();

  const user = mockIdentityUsers.find((identityUser) => identityUser.email === normalizedEmail);

  return user;
};

const checkPin = (user: IdentityUser, pin: string): boolean => {
  const pinHash = md5(pin + appConfig.salt);

  return user.pinHash === pinHash;
};

export const userManager = {
  findByEmail,
  checkPin,
};
