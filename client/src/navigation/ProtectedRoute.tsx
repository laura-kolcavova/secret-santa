import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';
import { pages } from './pages';

export type ProtectedRouteProps = {
  component: Component;
};

export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
  const [loggedUserState] = useLoggedUserContext();

  const navigate = useNavigate();

  if (!loggedUserState.isAuthenticated) {
    navigate(pages.LogIn.paths[0]);

    return null;
  }

  return <props.component />;
};
