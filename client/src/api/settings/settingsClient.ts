import { AxiosPromise, GenericAbortSignal } from 'axios';
import { CsrfTokenResponseDto } from './CsrfTokenResponseDto';
import { callAxios } from '~/utils/axios';

const baseUrl = '/api/settings';

const getCsrfToken = (signal?: GenericAbortSignal): AxiosPromise<CsrfTokenResponseDto> => {
  return callAxios({
    url: `${baseUrl}/csrf-token`,
    method: 'GET',
    signal: signal,
  });
};

export const settingsClient = {
  getCsrfToken,
};
