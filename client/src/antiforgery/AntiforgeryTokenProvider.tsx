import {
  createContext,
  createEffect,
  Match,
  Switch,
  useContext,
  type ParentComponent,
} from 'solid-js';

import { sharedMessages } from '~/pages/shared/sharedMessages';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { useAntiforgeryTokenQuery } from './hooks/useAntiforgeryTokenQuery';
import axios from 'axios';

export type AntiforgeryTokenContextValue = [
  actions: {
    refresh: () => void;
  },
];

const AntiforgeryTokenContext = createContext<AntiforgeryTokenContextValue | null>(null);

export const AntiforgeryTokenProvider: ParentComponent = (props) => {
  const [dataAntiforgeryToken, { refetch: refetchAntiforgeryToken }] = useAntiforgeryTokenQuery();

  const refresh = () => {
    refetchAntiforgeryToken();
  };

  createEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (config.method !== 'get') {
          const token = dataAntiforgeryToken();

          config.headers['X-CSRF-Token'] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.request.eject(interceptor);
  });

  return (
    <AntiforgeryTokenContext.Provider value={[{ refresh }]}>
      <Switch
        fallback={
          <div class="flex flex-col justify-center items-center h-full">
            <SpinnerIcon class="animate-spin size-5 mx-auto" />
          </div>
        }>
        <Match when={dataAntiforgeryToken.error}>
          <div class="flex flex-col justify-center items-center h-full">
            <span class="text-xl font-bold text-red-700">
              <FormattedMessage message={sharedMessages.somethingWentWrong} />
            </span>
          </div>
        </Match>
        <Match when={!dataAntiforgeryToken.loading}>{props.children}</Match>
      </Switch>
    </AntiforgeryTokenContext.Provider>
  );
};

export const useAntiforgeryTokenContext = () => {
  const contextValue = useContext(AntiforgeryTokenContext);

  if (contextValue === null) {
    throw new Error('AntiforgeryTokenProvider missing');
  }

  return contextValue;
};
