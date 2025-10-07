import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { NewProfileRequestDto } from '~/api/user/dto/NewProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useNewProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const newProfileAsync = async (newProfileRequest: NewProfileRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.newProfile(newProfileRequest, signal);

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

  const newProfile = (newProfileRequest: NewProfileRequestDto) => {
    newProfileAsync(newProfileRequest);
  };

  return { newProfile, getIsPending, getIsSuccess, getIsError, getError };
};
