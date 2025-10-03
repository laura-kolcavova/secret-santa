import { batch, createSignal } from 'solid-js';
import { EditProfileRequestDto } from '~/api/user/dto/EditProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useEditProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);

  const editProfileAsync = async (
    editProfileRequest: EditProfileRequestDto,
    signal?: AbortSignal,
  ) => {
    batch(() => {
      setIsPending(true);
      setIsSuccess(false);
      setIsError(false);
      setError(undefined);
    });

    try {
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
    }
  };

  const editProfile = (editProfileRequest: EditProfileRequestDto, signal?: AbortSignal) => {
    editProfileAsync(editProfileRequest, signal);
  };

  return { editProfile, getIsPending, getIsSuccess, getIsError, getError };
};
