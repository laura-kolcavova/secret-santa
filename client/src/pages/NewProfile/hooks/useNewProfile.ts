import { createSignal } from 'solid-js';

export const useNewProfile = () => {
  const [getIsPending, setIsPending] = createSignal<boolean>(false);
  const [getIsError, setIsError] = createSignal<boolean>(false);
  const [getIsSuccess, setIsSuccess] = createSignal<boolean>(false);
  const [getErrorMessage, setErrorMessage] = createSignal<string | null>(null);

  return { getIsPending, getIsError, getIsSuccess, getErrorMessage };
};
