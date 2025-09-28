import { computePinHash } from '~/application/shared/pinHelper';
import { UnitResult, unitResultError, unitResultSuccess } from '../../shared/models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const changePin = (email: string, currentPin: string, newPin: string): UnitResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return unitResultError(userErrors.notFound());
  }

  const currentPinHash = computePinHash(currentPin);

  if (currentPinHash !== user.pinHash) {
    return unitResultError(userErrors.invalidCurrentPin());
  }

  const newPinHash = computePinHash(newPin);

  if (newPinHash === user.pinHash) {
    return unitResultError(userErrors.newPinMustDiffer());
  }

  userManager.updatePinHash(user, newPinHash);

  return unitResultSuccess();
};

export const changePinService = {
  changePin,
};
