import { AxiosError } from 'axios';
import { batch, createSignal } from 'solid-js';
import { NewProfileRequestDto } from '~/api/user/dto/NewProfileRequestDto';
import { userClient } from '~/api/user/userClient';

const handleErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data.code) {
    const code = error.response.data.code;

    switch (code) {
      case 'User.EmailAlreadyExists':
        return 'Uživatel s tímto e-mailem již existuje';
    }
  }

  return 'Něco se pokazilo';
};

export const useNewProfile = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  const newProfileAsync = async (newProfileRequest: NewProfileRequestDto, signal?: AbortSignal) => {
    batch(() => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);
      setErrorMessage('');
    });

    try {
      await userClient.newProfile(newProfileRequest, signal);

      batch(() => {
        setIsSuccess(true);
        setIsPending(false);
      });
    } catch (error) {
      batch(() => {
        setIsError(true);
        setErrorMessage(handleErrorMessage(error));
        setIsPending(false);
      });
    }
  };

  const newProfile = (newProfileRequest: NewProfileRequestDto, signal?: AbortSignal) => {
    newProfileAsync(newProfileRequest, signal);
  };

  return { newProfile, getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
