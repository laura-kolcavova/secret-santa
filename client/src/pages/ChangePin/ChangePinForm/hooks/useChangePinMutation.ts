import { batch, createSignal } from 'solid-js';

import { userClient } from '~/api/user/userClient';
import { ChangePinRequestDto } from '~/api/user/dto/ChangePinRequestDto';

export const useChangePinMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const changePinAsync = async (changePinRequest: ChangePinRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
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
    }
  };

  const changePin = (changePinRequest: ChangePinRequestDto, signal?: AbortSignal) => {
    changePinAsync(changePinRequest, signal);
  };

  return { changePin, getIsPending, getIsSuccess, getIsError, getError };
};
