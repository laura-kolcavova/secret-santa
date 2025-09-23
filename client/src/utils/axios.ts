import axios, { type AxiosRequestConfig } from 'axios';
import { appConfig } from '~/config/appConfig';

import { REQUEST_TIMEOUT } from '~/constants';

const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL: appConfig.API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
  },
  withCredentials: true,
};

export const callAxios = (config: AxiosRequestConfig) => {
  const newConfig: AxiosRequestConfig = {
    ...defaultAxiosConfig,
    ...config,
    headers: {
      ...defaultAxiosConfig.headers,
      ...config.headers,
    },
  };

  return axios(newConfig);
};
