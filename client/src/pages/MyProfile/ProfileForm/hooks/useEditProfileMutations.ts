import { batch, createSignal } from 'solid-js';
import { useEditProfileErrorHandler } from './useEditProfileErrorHandler';
import { EditProfileRequestDto } from '~/api/user/dto/EditProfileRequestDto';
import { userClient } from '~/api/user/userClient';

export const useEditProfileMutation = () => {
  const { handleError } = useEditProfileErrorHandler();

  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const editProfileAsync = async (
    editProfileRequest: EditProfileRequestDto,
    signal?: AbortSignal,
  ) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage('');
    });

    try {
      await userClient.editProfile(editProfileRequest, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsError(true);
        setErrorMessage(handleError(error));
        setIsPending(false);
      });
    }
  };

  const editProfile = (editProfileRequest: EditProfileRequestDto, signal?: AbortSignal) => {
    editProfileAsync(editProfileRequest, signal);
  };

  return { editProfile, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
