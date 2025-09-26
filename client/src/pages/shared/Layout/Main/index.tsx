import { ParentComponent } from 'solid-js';

export const Main: ParentComponent = (props) => {
  return <main class="flex-auto">{props.children}</main>;
};
