import { computePinHash } from '~/application/shared/utils/pinHelper';
import { UnitResult, unitResultError, unitResultSuccess } from '../../shared/models/UnitResult';
import { userManager } from './userManager';
import { userErrors } from '../userErrors';

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
