import { batch, createSignal } from 'solid-js';
import { userClient } from '~/api/user/userClient';

export const useLogOutMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const muateAsync = async (signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      await userClient.logout(signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsPending(false);
        setError(error);
      });
    }
  };

  const mutate = (signal?: AbortSignal) => {
    muateAsync(signal);
  };

  return { mutate, getIsPending, getIsSuccess, getError };
};
