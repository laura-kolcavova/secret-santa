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

const toBool = (value: string): boolean => {
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
  port: toNumber(required('PORT')),
  jwtSecret: toString(required('JWT_SECRET')),
  spaStaticFilesRootPath: toString(required('SPA_STATIC_FILES_ROOT_PATH')),
  useProxyToSpaDevelopmentServer: toBool(required('USE_PROXY_TO_SPA_DEVELOPMENT_SERVER')),
  proxyToSpaDevelopmentServerUrl: toString(required('PROXY_TO_SPA_DEVELOPMENT_SERVER_URL')),
  sqliteDbFilePath: toString(required('SQLITE_DB_FILE_PATH')),
};
