const required = (envKey: string): string => {
  const value = process.env[envKey];

  if (value === undefined) {
    throw new Error(`Environment variable ${envKey} is required but not defined.`);
  }

  return value;
};

const envAsString = (envKey: string): string => {
  const value = required(envKey);

  return value.toString();
};

const envAsNumber = (envKey: string): number => {
  const value = required(envKey);

  const num = Number(value);

  if (isNaN(num)) {
    throw new Error(`Value ${value} must be a valid number.`);
  }

  return num;
};

const envAsBool = (envKey: string): boolean => {
  const value = required(envKey);

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
  spaStaticFilesRootPath: string;
  useProxyToSpaDevelopmentServer: boolean;
  proxyToSpaDevelopmentServerUrl: string;
  sqliteDbFilePath: string;
}

export const appConfig: AppConfig = {
  port: envAsNumber('PORT'),
  jwtSecret: envAsString('JWT_SECRET'),
  spaStaticFilesRootPath: envAsString('SPA_STATIC_FILES_ROOT_PATH'),
  useProxyToSpaDevelopmentServer: envAsBool('USE_PROXY_TO_SPA_DEVELOPMENT_SERVER'),
  proxyToSpaDevelopmentServerUrl: envAsString('PROXY_TO_SPA_DEVELOPMENT_SERVER_URL'),
  sqliteDbFilePath: envAsString('SQLITE_DB_FILE_PATH'),
};
