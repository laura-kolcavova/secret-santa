import { createSignal, onCleanup, onMount } from 'solid-js';

export const useTimer = () => {
  const [getNowUtc, setNowUtc] = createSignal<Date>(new Date());

  let interval: NodeJS.Timeout | null = null;

  const updateTime = () => {
    const newNowUtc = new Date();

    setNowUtc(newNowUtc);
  };

  onMount(() => {
    updateTime();

    interval = setInterval(updateTime, 1000);
  });

  onCleanup(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  return { getNowUtc };
};
