import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CountdownProps = {
  sourceDate: Date;
  targetDate: Date;
};

export const Countdown: Component<CountdownProps> = (props) => {
  const [getTimeLeft, setTimeLeft] = createSignal<TimeParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const source = props.sourceDate.getTime();
    const target = props.targetDate.getTime();
    const difference = target - source;

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

  createEffect(() => {
    calculateTimeLeft();
  });

  return (
    <div class="p-4 text-center text-gray-600">
      <div class="flex justify-center gap-4">
        <div class="flex flex-col">
          <span class="text-xl font-bold">{getTimeLeft().days}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.days} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{getTimeLeft().hours}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.hours} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{getTimeLeft().minutes}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.minutes} />
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold">{getTimeLeft().seconds}</span>
          <span class="text-xs">
            <FormattedMessage message={messages.seconds} />
          </span>
        </div>
      </div>
    </div>
  );
};
