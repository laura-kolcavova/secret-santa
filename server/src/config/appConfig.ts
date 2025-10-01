const required = (envKey: string): string => {
  const value = process.env[envKey];

  if (value === undefined) {
    throw new Error(`Environment variable ${envKey} is required but not defined.`);
  }

  return value;
};

const toString = (value: string): string => {
  return value.toString();
};

const toNumber = (value: string): number => {
  const num = Number(value);

  if (isNaN(num)) {
    throw new Error(`Value ${value} must be a valid number.`);
  }

  return num;
};

export interface AppConfig {
  port: number;
  jwtSecret: string;
}

export const appConfig: AppConfig = {
  port: toNumber(required('PORT')),
  jwtSecret: toString(required('JWT_SECRET')),
};
