import { batch, createSignal } from 'solid-js';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';

export const useJoinDrawGroupMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const mutateAsync = async (drawGroupGuid: string, signal?: AbortSignal): Promise<void> => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
      await drawGroupsClient.joinDrawGroup(drawGroupGuid, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsPending(false);
        setIsError(true);
        setError(error);
      });
    }
  };

  const mutate = (drawGroupGuid: string, signal?: AbortSignal): void => {
    mutateAsync(drawGroupGuid, signal);
  };

  return { mutate, getIsPending, getIsSuccess, getIsError, getError };
};
