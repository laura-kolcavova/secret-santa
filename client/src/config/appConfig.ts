const required = (envKey: string): string => {
  const value = import.meta.env[envKey];

  if (value === undefined) {
    throw new Error(`Environment variable ${envKey} is required but not defined.`);
  }

  return value;
};

const envAsString = (envKey: string): string => {
  const value = required(envKey);

  return value.toString();
};

export interface AppConfig {
  apiUrl: string;
}

export const appConfig: AppConfig = {
  apiUrl: envAsString('VITE_APP_API_URL'),
};
