import { AxiosError } from 'axios';
import { batch, createSignal } from 'solid-js';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';

const handleErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data.code) {
    const code = error.response.data.code;

    switch (code) {
      case 'User.NotFound':
        return 'Uživatel nebyl nalezen';
      case 'User.PinDoNotMatch':
        return 'Neplatný pin';
    }
  }

  return 'Něco se pokazilo';
};

export const useLogin = () => {
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
        setErrorMessage(handleErrorMessage(error));
        setIsPending(false);
      });
    }
  };

  const login = (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    loginAsync(loginRequest, signal);
  };

  return { login, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
