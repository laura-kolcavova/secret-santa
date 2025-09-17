import { Component, createSignal, JSX, Show } from 'solid-js';
import { XMarkIcon } from './icons/XMarkIcon';

export type AlertProps = {
  color: 'info' | 'success' | 'warning' | 'danger';
  isDismissible?: boolean;
  children?: JSX.Element;
};

export const Alert: Component<AlertProps> = ({ color, children, isDismissible = true }) => {
  const [getIsVisible, setIsVisible] = createSignal(true);

  let alertStyles: string;
  let buttonStyles: string;

  switch (color) {
    case 'info':
      alertStyles = 'bg-blue-100 border-blue-500 text-blue-700';
      buttonStyles = 'text-blue-500  hover:text-blue-700';
      break;
    case 'success':
      alertStyles = 'bg-green-100 border-green-500 text-green-700';
      buttonStyles = 'text-green-500 hover:text-green-700';
      break;
    case 'warning':
      alertStyles = 'bg-orange-100 border-orange-500 text-orange-700';
      buttonStyles = 'text-orange-500 hover:text-orange-700';
      break;
    case 'danger':
      alertStyles = 'bg-red-100 border-red-500 text-red-700';
      buttonStyles = 'text-red-500 hover:text-red-700';
      break;
    default:
      alertStyles = '';
      buttonStyles = '';
      break;
  }

  return (
    <Show when={getIsVisible()}>
      <div class={`p-4 border-l-4 rounded relative mb-4 ${alertStyles}`}>
        {children}
        {isDismissible && (
          <button
            class={`absolute top-0 right-0 p-3 cursor-pointer transition-colors duration-150 ${buttonStyles}`}
            onClick={() => setIsVisible(false)}>
            <XMarkIcon class="size-5" />
          </button>
        )}
      </div>
    </Show>
  );
};
