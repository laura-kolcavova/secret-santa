import { onCleanup } from 'solid-js';

export const useAbortController = () => {
  let abortController: AbortController | null = null;

  const createAbortSignal = (): AbortSignal => {
    cancelAbortSignal();

    abortController = new AbortController();

    return abortController.signal;
  };

  const cancelAbortSignal = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };

  const finishAbortSignal = () => {
    abortController = null;
  };

  onCleanup(() => {
    cancelAbortSignal();
  });

  return { createAbortSignal, cancelAbortSignal, finishAbortSignal };
};
