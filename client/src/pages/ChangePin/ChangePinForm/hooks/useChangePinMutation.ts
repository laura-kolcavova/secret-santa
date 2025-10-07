import { batch, createSignal } from 'solid-js';

import { userClient } from '~/api/user/userClient';
import { ChangePinRequestDto } from '~/api/user/dto/ChangePinRequestDto';
import { useAbortController } from '~/abort/useAbortController';

export const useChangePinMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const changePinAsync = async (changePinRequest: ChangePinRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.changePin(changePinRequest, signal);

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
    } finally {
      finishAbortSignal();
    }
  };

  const changePin = (changePinRequest: ChangePinRequestDto) => {
    changePinAsync(changePinRequest);
  };

  return { changePin, getIsPending, getIsSuccess, getIsError, getError };
};
