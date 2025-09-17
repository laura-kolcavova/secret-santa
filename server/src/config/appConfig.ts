function envToString(key: string): string {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }

  return value;
}

function envToNumber(key: string): number {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }

  const num = Number(value);

  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} must be a valid number.`);
  }

  return num;
}

export interface AppConfig {
  port: number;
  salt: string;
}

export const appConfig: AppConfig = {
  port: envToNumber('PORT'),
  salt: envToString('SALT'),
};
