import { Component } from 'solid-js';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';

import { LogOutButton } from './LogOutButton';

export const Header: Component = () => {
  const [loggedUserState] = useLoggedUserContext();

  return (
    <header class="border-b border-solid border-gray-300 bg-gray-50">
      <div class="container mx-auto flex py-6">
        <div class="flex-1"></div>

        <div class="flex-1 flex items-center justify-center">
          <span class="text-3xl font-bold text-pallete-6">Santa Los</span>
        </div>

        <div class="flex-1 flex items-center justify-end">
          {loggedUserState.isAuthenticated && <LogOutButton />}
        </div>
      </div>
    </header>
  );
};
