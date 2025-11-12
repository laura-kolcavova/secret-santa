import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { userClient } from '~/api/user/userClient';

export const useLogOutMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const muateAsync = async () => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.logout(signal);

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

  const mutate = () => {
    muateAsync();
  };

  return { mutate, getIsPending, getIsError, getIsSuccess, getError };
};
