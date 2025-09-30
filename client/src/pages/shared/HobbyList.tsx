import { Component, For, Show } from 'solid-js';
import { HobbyTag } from './HobbyTag';

export type HobbyListProps = {
  hobbies: string[];
  removeHobby?: (removedHobby: string) => void;
};

export const HobbyList: Component<HobbyListProps> = (props) => {
  return (
    <Show when={props.hobbies.length > 0}>
      <div class="flex flex-row flex-wrap gap-2">
        <For each={props.hobbies}>
          {(tag) => <HobbyTag tag={tag} removeTag={props.removeHobby}></HobbyTag>}
        </For>
      </div>
    </Show>
  );
};
