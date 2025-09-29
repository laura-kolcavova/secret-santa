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

const joinDrawGroup = (
  drawGroupGuid: string,
  signal?: GenericAbortSignal,
): AxiosPromise<UserDrawGroupDto> => {
  return callAxios({
    url: `${baseUrl}/${drawGroupGuid}/join`,
    method: 'POST',
    signal: signal,
  });
};

const drawParticipant = (
  drawGroupGuid: string,
  signal?: GenericAbortSignal,
): AxiosPromise<UserDrawGroupDto> => {
  return callAxios({
    url: `${baseUrl}/${drawGroupGuid}/draw`,
    method: 'POST',
    signal: signal,
  });
};

export const drawGroupsClient = {
  getUserDrawGroup,
  joinDrawGroup,
  drawParticipant,
};
