import { createResource } from 'solid-js';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';

const fetchUserDrawGroup = async () => {
  const response = await drawGroupsClient.getUserDrawGroup();

  return response.status === 204 ? null : response.data;
};

export const useUserDrawGroupQuery = () => {
  return createResource(fetchUserDrawGroup);
};
