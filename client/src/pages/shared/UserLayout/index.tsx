import { useLocation } from '@solidjs/router';
import { Component, JSX } from 'solid-js';
import { pages } from '~/navigation/pages';
import { SidebarNavItem } from './SidebarNavItem';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';

export type UserLayoutProps = {
  children: JSX.Element;
};

export const UserLayout: Component<UserLayoutProps> = (props) => {
  const location = useLocation();

  const [loggedUserContextState] = useLoggedUserContext();

  const overviewPath = pages.Overview.paths[0];
  const myProfilePath = pages.MyProfile.paths[0];
  const changePinPath = pages.ChangePin.paths[0];

  return (
    <div class="container mx-auto py-6">
      <div class="mb-4">
        <h1>
          <span class="block text-2xl font-bold">{loggedUserContextState.user.fullName}</span>
          <span class="block text-xl font-light text-pallete-7">
            {loggedUserContextState.user.email}
          </span>
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

              <SidebarNavItem
                label={<FormattedMessage message={messages.changePin} />}
                path={changePinPath}
                isActive={location.pathname === changePinPath}
              />
            </ul>
          </nav>
        </div>

        <div class="col-2 px-6">{props.children}</div>
      </div>
    </div>
  );
};
