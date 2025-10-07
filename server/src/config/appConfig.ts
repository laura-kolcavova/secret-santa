const getEnv = (envKey: string): string | undefined => {
  return process.env[envKey];
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

const envAsNumber = (envKey: string): number | undefined => {
  const value = getEnv(envKey);

  if (value === undefined) {
    return value;
  }

  const num = Number(value);

  if (isNaN(num)) {
    throw new Error(`Value ${value} must be a valid number.`);
  }

  return num;
};

const envAsBool = (envKey: string): boolean | undefined => {
  const value = getEnv(envKey);

  if (value === undefined) {
    return value;
  }

  const lowerValue = value.toLowerCase();

  if (lowerValue === 'true' || lowerValue === '1') {
    return true;
  }

  if (lowerValue === 'false' || lowerValue === '0') {
    return false;
  }

  throw new Error(`Value ${value} must be a valid boolean (true/false or 1/0).`);
};

export interface AppConfig {
  port: number;
  jwtSecret: string;
  sqliteDbFilePath: string;
  spaStaticFilesRootPath: string;
  useProxyToSpaDevelopmentServer: boolean;
  proxyToSpaDevelopmentServerUrl: string;
}

export const appConfig: AppConfig = {
  port: envAsNumber(envRequired('PORT'))!,
  jwtSecret: envAsString(envRequired('JWT_SECRET'))!,
  sqliteDbFilePath: envAsString(envRequired('SQLITE_DB_FILE_PATH'))!,
  spaStaticFilesRootPath: envAsString(envRequired('SPA_STATIC_FILES_ROOT_PATH'))!,
  useProxyToSpaDevelopmentServer: envAsBool(envRequired('USE_PROXY_TO_SPA_DEVELOPMENT_SERVER'))!,
  proxyToSpaDevelopmentServerUrl: envAsString('PROXY_TO_SPA_DEVELOPMENT_SERVER_URL') ?? '',
};
