import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { EditProfileRequestDto } from '~/api/user/dto/EditProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useEditProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const editProfileAsync = async (editProfileRequest: EditProfileRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
      const signal = createAbortSignal();

      await userClient.editProfile(editProfileRequest, signal);

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

  const editProfile = (editProfileRequest: EditProfileRequestDto) => {
    editProfileAsync(editProfileRequest);
  };

  return { editProfile, getIsPending, getIsSuccess, getIsError, getError };
};
