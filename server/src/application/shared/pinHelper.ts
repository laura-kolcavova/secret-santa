import md5 from 'md5';
import { appConfig } from '~/config/appConfig';

export const computePinHash = (pin: string) => {
  return md5(pin + appConfig.salt);
};
