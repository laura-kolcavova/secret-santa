import { batch, createSignal } from 'solid-js';
import { useAbortController } from '~/abort/useAbortController';
import { EditProfileRequestDto } from '~/api/user/dto/EditProfileRequestDto';
import { LoggedUserDto } from '~/api/user/dto/LoggedUserDto';
import { userClient } from '~/api/user/userClient';

export const useEditProfileMutation = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getError, setError] = createSignal<unknown>(undefined);
  const [getData, setData] = createSignal<LoggedUserDto | undefined>(undefined);

  const { createAbortSignal, finishAbortSignal } = useAbortController();

  const editProfileAsync = async (editProfileRequest: EditProfileRequestDto) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setError(undefined);
      setData(undefined);
    });

    try {
      const signal = createAbortSignal();

      const { data } = await userClient.editProfile(editProfileRequest, signal);

      batch(() => {
        setIsPending(false);
        setIsSuccess(true);
        setData(data);
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

  return { editProfile, getIsPending, getIsError, getIsSuccess, getError, getData };
};
