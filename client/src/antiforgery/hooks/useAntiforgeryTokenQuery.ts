import { createResource } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { settingsClient } from '~/api/settings/settingsClient';

export const useAntiforgeryTokenQuery = () => {
  const { createAbortSignal, finishAbortSignal } = useAbortController();

  return createResource(async () => {
    try {
      const signal = createAbortSignal();

      const { data } = await settingsClient.getCsrfToken(signal);

      return data.csrfToken;
    } finally {
      finishAbortSignal();
    }
  });
};
