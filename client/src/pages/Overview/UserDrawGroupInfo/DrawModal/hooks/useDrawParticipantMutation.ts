import { batch, createSignal } from 'solid-js';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';

export const useDrawParticipantMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const mutateAsync = async (drawGroupGuid: string, signal?: AbortSignal): Promise<void> => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      await drawGroupsClient.drawParticipant(drawGroupGuid, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsPending(false);
        setError(error);
      });
    }
  };

  const mutate = (drawGroupGuid: string, signal?: AbortSignal): void => {
    mutateAsync(drawGroupGuid, signal);
  };

  return { mutate, getIsPending, getIsSuccess, getError };
};
