import { Component } from 'solid-js';
import { XMarkIcon } from './icons/XMarkIcon';

export type HobbyTagProps = {
  tag: string;
  removeTag: (tag: string) => void;
};

export const HobbyTag: Component<HobbyTagProps> = (props) => {
  return (
    <div class="py-2 px-2.5 rounded-lg flex flex-row items-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8">
      <span class="text-sm font-normal align-middle mr-2">{props.tag}</span>

      <button
        class="inline-block align-middle cursor-pointer p-2 -m-2"
        onClick={() => props.removeTag(props.tag)}>
        <XMarkIcon class="size-5" />
      </button>
    </div>
  );
};
