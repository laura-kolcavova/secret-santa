import { createResource } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';

export const useUserDrawGroupQuery = () => {
  const { createAbortSignal, finishAbortSignal } = useAbortController();

  return createResource(async () => {
    try {
      const signal = createAbortSignal();

      const response = await drawGroupsClient.getUserDrawGroup(signal);

      return response.status === 204 ? null : response.data;
    } catch {
      finishAbortSignal();
    }
  });
};
