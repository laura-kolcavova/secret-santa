import { batch, createSignal } from 'solid-js';
import { userClient } from '~/api/user/userClient';

export const useLogOutMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);

  const muateAsync = async (signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
    });

    try {
      await userClient.logout(signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsError(true);
        setIsPending(false);
      });
    }
  };

  const mutate = (signal?: AbortSignal) => {
    muateAsync(signal);
  };

  return { mutate, getIsPending, getIsError, getIsSuccess };
};
