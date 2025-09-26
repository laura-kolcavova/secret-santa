import { batch, createSignal } from 'solid-js';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';
import { useLoginErrorHandler } from './useLoginErrorHandler';

export const useLoginMutation = () => {
  const { handleError } = useLoginErrorHandler();

  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const mutateAsync = async (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage('');
    });

    try {
      await userClient.login(loginRequest, signal);

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

  const mutate = (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    mutateAsync(loginRequest, signal);
  };

  return { mutate, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
