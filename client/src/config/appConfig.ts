const getEnv = (envKey: string): string | undefined => {
  return import.meta.env[envKey];
};

const envRequired = (envKey: string): string => {
  const value = getEnv(envKey);

  if (value === undefined) {
    throw new Error(`Environment variable ${envKey} is required but not defined.`);
  }

  return envKey;
};

const envAsString = (envKey: string): string | undefined => {
  const value = getEnv(envKey);

  if (value === undefined) {
    return value;
  }

  return value;
};

export interface AppConfig {
  apiUrl: string;
}

export const appConfig: AppConfig = {
  apiUrl: envAsString(envRequired('VITE_APP_API_URL'))!,
};
