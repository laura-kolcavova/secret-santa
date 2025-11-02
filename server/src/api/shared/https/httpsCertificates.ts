import fs from 'fs';
import path from 'path';
import { appConfig } from '~/config/appConfig';

export type HttpsCertificates = {
  cert: Buffer;
  key: Buffer;
};

export const loadHttpsCertificates = (certPath: string, keyPath: string): HttpsCertificates => {
  try {
    if (!fs.existsSync(certPath)) {
      throw new Error(`HTTPS certificate file not found: ${certPath}`);
    }

    if (!fs.existsSync(keyPath)) {
      throw new Error(`HTTPS private key file not found: ${keyPath}`);
    }

    return {
      cert: fs.readFileSync(certPath),
      key: fs.readFileSync(keyPath),
    };
  } catch (error) {
    console.error('Failed to load HTTPS certificates:', error);

    throw error;
  }
};
