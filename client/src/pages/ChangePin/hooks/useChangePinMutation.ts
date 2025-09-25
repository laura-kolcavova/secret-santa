import { batch, createSignal } from 'solid-js';

import { userClient } from '~/api/user/userClient';
import { ChangePinRequestDto } from '~/api/user/dto/ChangePinRequestDto';
import { useChangePinErrorHandler } from './useChangePinErrorHandler';

export const useChangePinMutation = () => {
  const { handleError } = useChangePinErrorHandler();

  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const changePinAsync = async (changePinRequest: ChangePinRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage('');
    });

    try {
      await userClient.changePin(changePinRequest, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsError(true);
        setErrorMessage(handleError(error));
        setIsPending(false);
      });
    }
  };

  const changePin = (changePinRequest: ChangePinRequestDto, signal?: AbortSignal) => {
    changePinAsync(changePinRequest, signal);
  };

  return { changePin, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
