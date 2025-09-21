import { useLocation } from '@solidjs/router';
import { Component, JSX } from 'solid-js';
import { pages } from '~/navigation/pages';
import { SidebarNavItem } from './SidebarNavItem';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

export type UserLayoutProps = {
  children: JSX.Element;
};

export const UserLayout: Component<UserLayoutProps> = (props) => {
  const location = useLocation();

  const email = 'laura.kolcavova@email.cz';
  const overviewPath = pages.Overview.paths[0].replace(':email', email);
  const myProfilePath = pages.MyProfile.paths[0].replace(':email', email);

  return (
    <div class="container mx-auto py-6">
      <div class="mb-4">
        <h1>
          <span class="block text-2xl font-bold">Laura Kolcavova</span>
          <span class="block text-xl font-light text-pallete-7">laura.kolcavova@email.cz</span>
        </h1>
      </div>

      <div class="grid grid-cols-2 gap-6 grid-cols-[17rem_1fr]">
        <div class="col-1">
          <nav>
            <ul class="list-none">
              <SidebarNavItem
                label={<FormattedMessage message={messages.overview} />}
                path={overviewPath}
                isActive={location.pathname === overviewPath}
              />

              <SidebarNavItem
                label={<FormattedMessage message={messages.myProfile} />}
                path={myProfilePath}
                isActive={location.pathname === myProfilePath}
              />
            </ul>
          </nav>
        </div>

        <div class="col-2 px-6">{props.children}</div>
      </div>
    </div>
  );
};
