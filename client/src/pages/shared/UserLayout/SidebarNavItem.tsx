import { A } from '@solidjs/router';
import { Component, JSX } from 'solid-js';

export type SidebarNavItemProps = {
  path: string;
  label: string | JSX.Element;
  isActive: boolean;
};

export const SidebarNavItem: Component<SidebarNavItemProps> = (props) => (
  <li>
    <A
      href={props.path}
      class={`w-full inline-block py-2 px-2.5 font-normal hover:bg-pallete-9 rounded-sm ${
        props.isActive ? 'font-semibold bg-pallete-9' : ''
      } `}>
      {props.label}
    </A>
  </li>
);
