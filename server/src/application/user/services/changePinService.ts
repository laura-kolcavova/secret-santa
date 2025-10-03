import { UnitResult, unitResultError, unitResultSuccess } from '../../shared/models/UnitResult';
import { userManager } from './userManager';
import { userErrors } from '../userErrors';

const changePin = (email: string, currentPin: string, newPin: string): UnitResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return unitResultError(userErrors.notFound());
  }

  if (!userManager.checkPin(user, currentPin)) {
    return unitResultError(userErrors.invalidCurrentPin());
  }

  if (userManager.checkPin(user, newPin)) {
    return unitResultError(userErrors.newPinMustDiffer());
  }

  userManager.changePin(user, newPin);

  return unitResultSuccess();
};

export const changePinService = {
  changePin,
};
