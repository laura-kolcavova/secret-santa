import { normalizeEmail } from '~/application/shared/utils/emailHelper';
import { comparePin, computePinHash } from '~/application/shared/utils/pinHelper';
import { assignRole, User } from '../models/User';
import { isDrawGroupManager } from '../utils/userRolesHelper';
import userRoles from '../models/userRoles';
import { userRepository } from '~/persistence/users/userRepository';

const checkPin = (user: User, pin: string): boolean => {
  return comparePin(pin, user.pinHash);
};

const findByEmail = (email: string, abortSignal: AbortSignal): User | undefined => {
  const normalizedEmail = normalizeEmail(email);

  const user = userRepository.findByEmail(normalizedEmail, abortSignal);

  if (user && isDrawGroupManager(user.email)) {
    assignRole(user, userRoles.DrawGroupManager);
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
  abortSignal: AbortSignal,
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
    roles: [],
    createdAtUtc: new Date(),
  };

  userRepository.addUser(user, abortSignal);

  return user;
};

const changeProfile = (
  user: User,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
  abortSignal: AbortSignal,
): void => {
  user.firstName = firstName;
  user.lastName = lastName;
  user.department = department;
  user.hobbies = [...hobbies];

  userRepository.updateProfile(user, abortSignal);
};

const changePin = (user: User, pin: string, abortSignal: AbortSignal): void => {
  const pinHash = computePinHash(pin);

  user.pinHash = pinHash;

  userRepository.updatePinHash(user, abortSignal);
};

export const userManager = {
  checkPin,
  findByEmail,
  createUser,
  changeProfile,
  changePin,
};
