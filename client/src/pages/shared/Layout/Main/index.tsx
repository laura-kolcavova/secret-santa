import { ParentComponent } from 'solid-js';

export const Main: ParentComponent = (props) => {
  return <main class="flex-1">{props.children}</main>;
};
