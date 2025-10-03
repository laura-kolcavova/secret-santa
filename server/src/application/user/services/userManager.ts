import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { comparePin, computePinHash } from '~/application/shared/utils/pinHelper';
import { User } from '../models/User';
import { usersCommands } from '~/persistence/users/usersCommands';
import { usersQueries } from '~/persistence/users/usersQueries';

const checkPin = (user: User, pin: string): boolean => {
  return comparePin(pin, user.pinHash);
};

const findByEmail = (email: string): User | undefined => {
  const normalizedEmail = normalizeEmail(email);

  const user = usersQueries.findByEmail(normalizedEmail);

  if (user === undefined) {
    return undefined;
  }

  return user;
};

const createUser = (
  email: string,
  pin: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): User => {
  const normalizedEmail = normalizeEmail(email);

  const pinHash = computePinHash(pin);

  const user: User = {
    email: normalizedEmail,
    pinHash,
    firstName,
    lastName,
    department,
    hobbies: [...hobbies],
    createdAtUtc: new Date(Date.now()),
  };

  usersCommands.addUser(user);

  return user;
};

const changeProfile = (
  user: User,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): void => {
  user.firstName = firstName;
  user.lastName = lastName;
  user.department = department;
  user.hobbies = [...hobbies];

  usersCommands.updateProfile(user);
};

const changePin = (user: User, pin: string): void => {
  const pinHash = computePinHash(pin);

  user.pinHash = pinHash;

  usersCommands.updatePinHash(user);
};

export const userManager = {
  checkPin,
  findByEmail,
  createUser,
  changeProfile,
  changePin,
};
