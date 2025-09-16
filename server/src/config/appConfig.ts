export interface AppConfig {
  port: number;
}

export const appConfig: AppConfig = {
  port: process.env.PORT !== undefined ? parseInt(process.env.PORT) : 3100,
};
