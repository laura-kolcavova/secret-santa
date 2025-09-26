import { Navigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';
import { pages } from './pages';

export type ProtectedRouteProps = {
  component: Component;
};

export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
  const [loggedUserState] = useLoggedUserContext();

  if (!loggedUserState.isAuthenticated) {
    return <Navigate href={pages.LogIn.paths[0]} />;
  }

  return <props.component />;
};
