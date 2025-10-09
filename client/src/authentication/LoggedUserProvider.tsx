import {
  createContext,
  createEffect,
  Match,
  Switch,
  useContext,
  type ParentComponent,
} from 'solid-js';

import { createStore } from 'solid-js/store';

import { LoggedUserDto } from '~/api/user/dto/LoggedUserDto';
import { useLoggedUserQuery } from './hooks/useLoggedUserQuery';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';

export type LoggedUserContextState = {
  readonly isAuthenticated: boolean;
  readonly user: LoggedUserDto;
};

export type LoggedUserContextValue = [
  state: LoggedUserContextState,
  actions: {
    refresh: () => void;
    clear: () => void;
    setUser: (newUser: LoggedUserDto) => void;
  },
];

const LoggedUserContext = createContext<LoggedUserContextValue | null>(null);

const getInitState = (): LoggedUserContextState => ({
  isAuthenticated: false,
  user: undefined!,
});

export const LoggedUserProvider: ParentComponent = (props) => {
  const [dataLoggedUser, { refetch: refetchLoggedUser }] = useLoggedUserQuery();

  const [state, setState] = createStore<LoggedUserContextState>(getInitState());

  createEffect(() => {
    if (dataLoggedUser()) {
      setState({
        isAuthenticated: true,
        user: dataLoggedUser()!,
      });
    }
  });

  const refresh = () => {
    refetchLoggedUser();
  };

  const clear = () => {
    setState(getInitState());
  };

  const setUser = (newUser: LoggedUserDto) => {
    setState({
      isAuthenticated: true,
      user: newUser,
    });
  };

  return (
    <LoggedUserContext.Provider value={[state, { refresh, clear, setUser }]}>
      <Switch
        fallback={
          <div class="flex flex-col justify-center items-center h-full">
            <SpinnerIcon class="animate-spin size-5 mx-auto" />
          </div>
        }>
        <Match when={dataLoggedUser.error}>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-xl font-bold text-red-700">
              <FormattedMessage message={sharedMessages.somethingWentWrong} />
            </span>
          </div>
        </Match>
        <Match when={!dataLoggedUser.loading}>{props.children}</Match>
      </Switch>
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUserContext = () => {
  const contextValue = useContext(LoggedUserContext);

  if (contextValue === null) {
    throw new Error('LoggedUserProvider missing');
  }

  return contextValue;
};
