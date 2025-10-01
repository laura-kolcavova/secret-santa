import bcrypt from 'bcrypt';

export const computePinHash = (pin: string): string => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(pin, salt);
};

export const validatePin = (pin: string, pinHash: string): boolean => {
  return bcrypt.compareSync(pin, pinHash);
};
