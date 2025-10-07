import { createResource } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { userClient } from '~/api/user/userClient';

export const useProfileQuery = () => {
  const { createAbortSignal, finishAbortSignal } = useAbortController();

  return createResource(async () => {
    try {
      const signal = createAbortSignal();

      const response = await userClient.getProfile(signal);

      return response.status === 204 ? null : response.data;
    } finally {
      finishAbortSignal();
    }
  });
};
