import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';
import { DrawParticipantResponseDto } from '~/api/drawGroups/dto/DrawParticipantResponseDto';

export const useDrawParticipantMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);
  const [getData, setData] = createSignal<DrawParticipantResponseDto | undefined>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const mutateAsync = async (drawGroupGuid: string): Promise<void> => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
      setData(undefined);
    });

    try {
      const signal = createAbortSignal();

      const response = await drawGroupsClient.drawParticipant(drawGroupGuid, signal);

      batch(() => {
        setIsPending(false);
        setIsSuccess(true);
        setData(response.data);
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

  const mutate = (drawGroupGuid: string): void => {
    mutateAsync(drawGroupGuid);
  };

  return { mutate, getIsPending, getIsError, getIsSuccess, getError, getData };
};
