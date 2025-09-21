import { createResource } from 'solid-js';
import { userClient } from '~/api/user/userClient';

const fetchUserDetail = async (email: string) => {
  const response = await userClient.getUserDetail(email);
  return response.status === 204 ? null : response.data;
};
export const useUserDetailQuery = (email: string) => {
  return createResource(() => email, fetchUserDetail);
};
