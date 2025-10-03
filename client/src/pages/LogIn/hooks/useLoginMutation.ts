import { batch, createSignal } from 'solid-js';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';

export const useLoginMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const mutateAsync = async (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
      await userClient.login(loginRequest, signal);

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

  const mutate = (loginRequest: LoginRequestDto, signal?: AbortSignal) => {
    mutateAsync(loginRequest, signal);
  };

  return { mutate, getIsPending, getIsSuccess, getIsError, getError };
};
