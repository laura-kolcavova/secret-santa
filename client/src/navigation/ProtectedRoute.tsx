import { Navigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';
import { pages } from './pages';
import { hasRole } from '~/api/user/dto/LoggedUserDto';

export type ProtectedRouteProps = {
  component: Component;
  roles: string[];
};

export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
  const [loggedUserState] = useLoggedUserContext();

  if (!loggedUserState.isAuthenticated) {
    return <Navigate href={pages.LogIn.paths[0]} />;
  }

  if (
    !(props.roles.length === 0 || props.roles.every((role) => hasRole(loggedUserState.user, role)))
  ) {
    return <Navigate href={pages.Overview.paths[0]} />;
  }

  return <props.component />;
};
