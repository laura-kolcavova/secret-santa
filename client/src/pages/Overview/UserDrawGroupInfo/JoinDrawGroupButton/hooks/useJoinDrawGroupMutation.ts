import { batch, createSignal } from 'solid-js';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';
import { useJoinDrawGroupErrorHandler } from './useJoinDrawGroupErrorHandler';

export const useJoinDrawGroupMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const mutateAsync = async (drawGroupGuid: string, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
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
        setError(error);
      });
    }
  };

  const mutate = (drawGroupGuid: string, signal?: AbortSignal) => {
    mutateAsync(drawGroupGuid, signal);
  };

  return { mutate, getIsPending, getIsSuccess, getError };
};
