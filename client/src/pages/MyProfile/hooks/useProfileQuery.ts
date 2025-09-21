import { createResource } from 'solid-js';
import { userClient } from '~/api/user/userClient';

const fetchProfile = async (email: string) => {
  const response = await userClient.getProfile(email);

  return response.status === 204 ? null : response.data;
};
export const useProfileQuery = (email: string) => {
  return createResource(() => email, fetchProfile);
};
