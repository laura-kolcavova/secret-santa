import { batch, createSignal } from 'solid-js';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';
import { useLoginErrorHandler } from './useLoginErrorHandler';

export const useLogin = () => {
  const { handleError } = useLoginErrorHandler();

  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const loginAsync = async (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
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

  const login = (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    loginAsync(loginRequest, signal);
  };

  return { login, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
