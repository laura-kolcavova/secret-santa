import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { NewProfileRequestDto } from '~/api/user/dto/NewProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useNewProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const newProfileAsync = async (newProfileRequest: NewProfileRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.newProfile(newProfileRequest, signal);

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

  const newProfile = (newProfileRequest: NewProfileRequestDto) => {
    newProfileAsync(newProfileRequest);
  };

  return { newProfile, getIsPending, getIsError, getIsSuccess, getError };
};
