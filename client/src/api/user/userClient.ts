import { AxiosPromise, GenericAbortSignal } from 'axios';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { callAxios } from '~/utils/axios';
import { NewProfileRequestDto } from './dto/NewProfileRequestDto';
import { ProfileDto } from './dto/ProfileDto';
import { EditProfileRequestDto } from './dto/EditProfileRequestDto';

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

const getProfile = (email: string, signal?: GenericAbortSignal): AxiosPromise<ProfileDto> => {
  return callAxios({
    url: `/api/user/${email}/profile`,
    method: 'GET',
    signal: signal,
  });
};

const editProfile = (
  email: string,
  editProfileRequest: EditProfileRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: `/api/user/${email}/profile`,
    method: 'PUT',
    data: editProfileRequest,
    signal: signal,
  });
};

export const userClient = {
  login,
  newProfile,
  getProfile,
  editProfile,
};
