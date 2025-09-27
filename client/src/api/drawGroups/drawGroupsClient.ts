import { AxiosPromise, GenericAbortSignal } from 'axios';
import { UserDrawGroupDto } from './dto/UserDrawGroupDto';
import { callAxios } from '~/utils/axios';

const baseUrl = '/api/draw-groups';

const getUserDrawGroup = (signal?: GenericAbortSignal): AxiosPromise<UserDrawGroupDto> => {
  return callAxios({
    url: `${baseUrl}/user`,
    method: 'GET',
    signal: signal,
  });
};

export const drawGroupsClient = {
  getUserDrawGroup,
};
