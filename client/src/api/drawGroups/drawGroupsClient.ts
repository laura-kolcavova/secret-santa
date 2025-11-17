import { AxiosPromise, GenericAbortSignal } from 'axios';
import { callAxios } from '~/utils/axios';
import { DrawParticipantResponseDto } from './dto/DrawParticipantResponseDto';
import { UserDrawGroupListDto } from './dto/UserDrawGroupListDto';
import { DrawGroupListDto } from './dto/DrawGroupListDto';
import { DrawGroupDetailDto } from './dto/DrawGroupDetailDto';
import { EditDrawGroupRequestDto } from './dto/EditDrawGroupRequestDto';
import { CreateDrawGroupRequestDto } from './dto/CreateDrawGroupRequestDto';
import { CreateDrawGroupResponseDto } from './dto/CreateDrawGroupResponseDto';

const baseUrl = '/api/draw-groups';

const getUserDrawGroupList = (signal?: GenericAbortSignal): AxiosPromise<UserDrawGroupListDto> => {
  return callAxios({
    url: `${baseUrl}/user-list`,
    method: 'GET',
    signal: signal,
  });
};

const getDrawGroupList = (signal?: GenericAbortSignal): AxiosPromise<DrawGroupListDto> => {
  return callAxios({
    url: `${baseUrl}/list`,
    method: 'GET',
    signal: signal,
  });
};

const getDrawGroupDetail = (
  drawGroupGuid: string,
  signal?: GenericAbortSignal,
): AxiosPromise<DrawGroupDetailDto> => {
  return callAxios({
    url: `${baseUrl}/${drawGroupGuid}/detail`,
    method: 'GET',
    signal: signal,
  });
};

const joinDrawGroup = (drawGroupGuid: string, signal?: GenericAbortSignal): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/${drawGroupGuid}/join`,
    method: 'POST',
    signal: signal,
  });
};

const drawParticipant = (
  drawGroupGuid: string,
  signal?: GenericAbortSignal,
): AxiosPromise<DrawParticipantResponseDto> => {
  return callAxios({
    url: `${baseUrl}/${drawGroupGuid}/draw`,
    method: 'POST',
    signal: signal,
  });
};

const createDrawGroup = (
  createDrawGroupRequest: CreateDrawGroupRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<CreateDrawGroupResponseDto> => {
  return callAxios({
    url: `${baseUrl}/create`,
    method: 'POST',
    data: createDrawGroupRequest,
    signal: signal,
  });
};

const editDrawGroup = (
  editDrawGroupRequest: EditDrawGroupRequestDto,
  signal?: GenericAbortSignal,
): AxiosPromise<void> => {
  return callAxios({
    url: `${baseUrl}/edit`,
    method: 'PUT',
    data: editDrawGroupRequest,
    signal: signal,
  });
};

export const drawGroupsClient = {
  getUserDrawGroupList,
  getDrawGroupList,
  getDrawGroupDetail,
  joinDrawGroup,
  drawParticipant,
  createDrawGroup,
  editDrawGroup,
};
