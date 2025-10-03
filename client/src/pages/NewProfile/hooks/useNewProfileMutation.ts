import { batch, createSignal } from 'solid-js';
import { NewProfileRequestDto } from '~/api/user/dto/NewProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useNewProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const newProfileAsync = async (newProfileRequest: NewProfileRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
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
    }
  };

  const newProfile = (newProfileRequest: NewProfileRequestDto, signal?: AbortSignal) => {
    newProfileAsync(newProfileRequest, signal);
  };

  return { newProfile, getIsPending, getIsSuccess, getIsError, getError };
};
