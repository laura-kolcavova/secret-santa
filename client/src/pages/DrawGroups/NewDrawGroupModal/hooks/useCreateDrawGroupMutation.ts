import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { drawGroupsClient } from '~/api/drawGroups/drawGroupsClient';
import { CreateDrawGroupRequestDto } from '~/api/drawGroups/dto/CreateDrawGroupRequestDto';
import { CreateDrawGroupResponseDto } from '~/api/drawGroups/dto/CreateDrawGroupResponseDto';

export const useCreateDrawGroupMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);
  const [getData, setData] = createSignal<CreateDrawGroupResponseDto | undefined>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const mutateAsync = async (createDrawGroupRequest: CreateDrawGroupRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
      setData(undefined);
    });

    try {
      const signal = createAbortSignal();

      const response = await drawGroupsClient.createDrawGroup(createDrawGroupRequest, signal);

      batch(() => {
        setIsPending(false);
        setIsSuccess(true);
        setData(response.data!);
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

  const mutate = (createDrawGroupRequest: CreateDrawGroupRequestDto) => {
    mutateAsync(createDrawGroupRequest);
  };

  return { mutate, mutateAsync, getIsPending, getIsError, getIsSuccess, getError, getData };
};
