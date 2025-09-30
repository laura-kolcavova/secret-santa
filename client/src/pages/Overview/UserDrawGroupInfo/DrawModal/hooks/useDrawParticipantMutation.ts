import { batch, createSignal } from 'solid-js';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';
import { DrawParticipantResponseDto } from '~/api/drawGroups/dto/DrawParticipantResponseDto';

export const useDrawParticipantMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);
  const [getData, setData] = createSignal<DrawParticipantResponseDto | undefined>(undefined);

  const mutateAsync = async (drawGroupGuid: string, signal?: AbortSignal): Promise<void> => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setError(undefined);
      setData(undefined);
    });

    try {
      const response = await drawGroupsClient.drawParticipant(drawGroupGuid, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
        setData(response.data);
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

  return { mutate, getIsPending, getIsSuccess, getData, getError };
};
