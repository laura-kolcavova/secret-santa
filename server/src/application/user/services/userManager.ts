import md5 from 'md5';
import { appConfig } from '~/config/appConfig';
import { mockIdentityUsers } from '../mockIdentityUsers';
import { IdentityUser } from '../models/IdentityUser';

const findByEmail = (email: string): IdentityUser | undefined => {
  const normalizedEmail = normalizeEmail(email);

  const user = mockIdentityUsers.find((identityUser) => identityUser.email === normalizedEmail);

  return user;
};

const checkPin = (user: IdentityUser, pin: string): boolean => {
  const pinHash = computePinHash(pin);

  return user.pinHash === pinHash;
};

const createUser = (
  email: string,
  pin: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
) => {
  const normalizedEmail = normalizeEmail(email);

  const pinHash = computePinHash(pin);

  const user: IdentityUser = {
    email: normalizedEmail,
    pinHash,
    firstName,
    lastName,
    department,
    hobbies,
  };

  mockIdentityUsers.push(user);
};

const normalizeEmail = (email: string) => {
  return email.trim().toLocaleLowerCase();
};

const computePinHash = (pin: string) => {
  return md5(pin + appConfig.salt);
};

export const userManager = {
  findByEmail,
  checkPin,
  createUser,
};
