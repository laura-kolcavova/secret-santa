import { AxiosPromise, GenericAbortSignal } from 'axios';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { callAxios } from '~/utils/axios';
import { NewProfileRequestDto } from './dto/NewProfileRequestDto';
import { UserDetailDto } from './dto/UserDetailDto';

const login = (loginRequest: LoginRequestDto, signal?: GenericAbortSignal): AxiosPromise<void> => {
  return callAxios({
    url: '/api/user/login',
    method: 'POST',
    data: loginRequest,
    signal: signal,
  });
};

const newProfile = (
  newProfileRequest: NewProfileRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: '/api/user/new-profile',
    method: 'POST',
    data: newProfileRequest,
    signal: signal,
  });
};

const getUserDetail = (email: string, signal?: GenericAbortSignal): AxiosPromise<UserDetailDto> => {
  return callAxios({
    url: `/api/user/${email}/detail`,
    method: 'GET',
    signal: signal,
  });
};

export const userClient = {
  login,
  newProfile,
  getUserDetail,
};
