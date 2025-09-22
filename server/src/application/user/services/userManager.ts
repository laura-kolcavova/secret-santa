import { normalizeEmail } from '~/application/shared/emailHelper';
import { mockIdentityUsers } from '../mockIdentityUsers';
import { IdentityUser } from '../models/IdentityUser';
import { computePinHash } from '~/application/shared/pinHelper';

const checkPin = (user: IdentityUser, pin: string): boolean => {
  const pinHash = computePinHash(pin);

  return user.pinHash === pinHash;
};

const findByEmail = (email: string): IdentityUser | undefined => {
  const normalizedEmail = normalizeEmail(email);

  const user = mockIdentityUsers.find((identityUser) => identityUser.email === normalizedEmail);

  if (user === undefined) {
    return undefined;
  }

  return { ...user };
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
    hobbies: [...hobbies],
    createdAt: new Date(Date.now()),
  };

  mockIdentityUsers.push(user);
};

const updateUserProfile = (userToUpdate: IdentityUser) => {
  mockIdentityUsers.forEach((identityUser) => {
    if (identityUser.email !== userToUpdate.email) {
      return;
    }

    identityUser.firstName = userToUpdate.firstName;
    identityUser.lastName = userToUpdate.lastName;
    identityUser.department = userToUpdate.department;
    identityUser.hobbies = [...userToUpdate.hobbies];
  });
};

export const userManager = {
  checkPin,
  findByEmail,
  createUser,
  updateUserProfile,
};
