export interface AppConfig {
  API_URL: string;
}

export const appConfig: AppConfig = {
  API_URL: import.meta.env.VITE_APP_API_URL.toString(),
};
