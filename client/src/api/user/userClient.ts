import { AxiosPromise, GenericAbortSignal } from 'axios';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { callAxios } from '~/utils/axios';
import { NewProfileRequestDto } from './dto/NewProfileRequestDto';
import { ProfileDto } from './dto/ProfileDto';
import { EditProfileRequestDto } from './dto/EditProfileRequestDto';
import { ChangePinRequestDto } from './dto/ChangePinRequestDto';
import { LoggedUserDto } from './dto/LoggedUserDto';

const baseUrl = '/api/users';

const login = (loginRequest: LoginRequestDto, signal?: GenericAbortSignal): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/login`,
    method: 'POST',
    data: loginRequest,
    signal: signal,
  });
};

const logout = (signal?: GenericAbortSignal): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/logout`,
    method: 'POST',
    signal: signal,
  });
};

const getLoggedUser = (signal?: GenericAbortSignal): AxiosPromise<LoggedUserDto> => {
  return callAxios({
    url: `${baseUrl}/logged`,
    method: 'GET',
    signal: signal,
  });
};

const newProfile = (
  newProfileRequest: NewProfileRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/new-profile`,
    method: 'POST',
    data: newProfileRequest,
    signal: signal,
  });
};

const getProfile = (signal?: GenericAbortSignal): AxiosPromise<ProfileDto> => {
  return callAxios({
    url: `${baseUrl}/profile`,
    method: 'GET',
    signal: signal,
  });
};

const editProfile = (
  editProfileRequest: EditProfileRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/profile`,
    method: 'PUT',
    data: editProfileRequest,
    signal: signal,
  });
};

const changePin = (
  changePinRequest: ChangePinRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/change-pin`,
    method: 'PUT',
    data: changePinRequest,
    signal,
  });
};

export const userClient = {
  login,
  logout,
  getLoggedUser,
  newProfile,
  getProfile,
  editProfile,
  changePin,
};
