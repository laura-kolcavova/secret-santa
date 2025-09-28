import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

export type CountdownProps = {
  targetDate: string;
};

export const Countdown: Component<CountdownProps> = (props) => {
  const [timeLeft, setTimeLeft] = createSignal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let interval: NodeJS.Timeout | null = null;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(props.targetDate).getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  onMount(() => {
    calculateTimeLeft();

    interval = setInterval(calculateTimeLeft, 1000);
  });

  onCleanup(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  return (
    <div class="p-4 text-center text-gray-600">
      <div class="flex justify-center gap-4">
        <div class="flex flex-col">
          <span class="text-xl font-bold">{timeLeft().days}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.days} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{timeLeft().hours}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.hours} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{timeLeft().minutes}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.minutes} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{timeLeft().seconds}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.seconds} />
          </span>
        </div>
      </div>
    </div>
  );
};
