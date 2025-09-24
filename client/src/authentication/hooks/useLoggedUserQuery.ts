import { createResource } from 'solid-js';
import { userClient } from '~/api/user/userClient';

const fetchLoggedUser = async () => {
  const response = await userClient.getLoggedUser();

  return response.status === 204 ? null : response.data;
};

export const useLoggedUserQuery = () => {
  return createResource(fetchLoggedUser);
};
