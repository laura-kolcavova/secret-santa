import { createResource } from 'solid-js';
import { userClient } from '~/api/user/userClient';

const fetchProfile = async () => {
  const response = await userClient.getProfile();

  return response.status === 204 ? null : response.data;
};

export const useProfileQuery = () => {
  return createResource(fetchProfile);
};
