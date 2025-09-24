import type { Component } from 'solid-js';
import { Layout } from './pages/shared/Layout';
import { TranslationProvider } from './translation/TranslationProvider';
import { LoggedUserProvider } from './authentication/LoggedUserProvider';

export const App: Component = () => {
  return (
    <TranslationProvider>
      <LoggedUserProvider>
        <Layout />
      </LoggedUserProvider>
    </TranslationProvider>
  );
};
