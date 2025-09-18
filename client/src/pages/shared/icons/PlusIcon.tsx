import { Component, JSX } from 'solid-js';

export const PlusIcon: Component<JSX.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class}
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={1.5}
      stroke="currentColor">
      <path stroke-linecap="round" stroke-line-join="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};
