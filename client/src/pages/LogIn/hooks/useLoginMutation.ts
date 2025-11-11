import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { LoginRequestDto } from '~/api/user/dto/LoginRequestDto';
import { userClient } from '~/api/user/userClient';

export const useLoginMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const mutateAsync = async (loginRequest: LoginRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.login(loginRequest, signal);

      batch(() => {
        setIsPending(false);
        setIsSuccess(true);
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

  const mutate = (loginRequest: LoginRequestDto) => {
    mutateAsync(loginRequest);
  };

  return { mutate, getIsPending, getIsError, getIsSuccess, getError };
};
