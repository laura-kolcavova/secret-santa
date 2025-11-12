import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';
import { EditDrawGroupRequestDto } from '~/api/drawGroups/dto/EditDrawGroupRequestDto';

export const useEditDrawGroupMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const mutateAsync = async (editDrawGroupRequest: EditDrawGroupRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await drawGroupsClient.editDrawGroup(editDrawGroupRequest, signal);

      batch(() => {
        setIsPending(false);
        setIsSuccess(true);
      });
    } catch (error) {
      batch(() => {
        setIsPending(false);
        setIsError(true);
        setError(error);
      });
    } finally {
      finishAbortSignal();
    }
  };

  const mutate = (editDrawGroupRequest: EditDrawGroupRequestDto) => {
    mutateAsync(editDrawGroupRequest);
  };

  return { mutate, mutateAsync, getIsPending, getIsError, getIsSuccess, getError };
};
