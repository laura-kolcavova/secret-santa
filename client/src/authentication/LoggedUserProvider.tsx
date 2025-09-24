import {
  Accessor,
  batch,
  createContext,
  createEffect,
  createSignal,
  Match,
  Show,
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

export type LoggedUserContextValue = [state: LoggedUserContextState];

const LoggedUserContext = createContext<LoggedUserContextValue | null>(null);

const initState: LoggedUserContextState = {
  isAuthenticated: false,
  user: undefined!,
};

export const LoggedUserProvider: ParentComponent = (props) => {
  const [data] = useLoggedUserQuery();

  const [state, setState] = createStore<LoggedUserContextState>(initState);

  createEffect(() => {
    if (data()) {
      setState({
        isAuthenticated: true,
        user: data()!,
      });
    }
  });

  return (
    <LoggedUserContext.Provider value={[state]}>
      <Switch
        fallback={
          <div class="flex flex-col justify-center items-center h-full">
            <SpinnerIcon class="animate-spin size-5 mx-auto" />
          </div>
        }>
        <Match when={data.error}>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-xl font-bold text-red-700">
              <FormattedMessage message={sharedMessages.somethingWentWrong} />
            </span>
          </div>
        </Match>
        <Match when={!data.loading}>{props.children}</Match>
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
