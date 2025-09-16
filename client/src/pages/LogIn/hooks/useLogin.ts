import { batch, createSignal } from 'solid-js';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';

export const useLogin = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const loginAsync = async (loginRequest: LoginRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
    });

    try {
      await userClient.login(loginRequest);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : 'Login failed');
        setIsPending(false);
      });
    }
  };

  const login = (loginRequest: LoginRequestDto) => {
    loginAsync(loginRequest);
  };

  return { login, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
