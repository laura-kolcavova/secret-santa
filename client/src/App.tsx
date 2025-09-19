import type { Component } from 'solid-js';
import { Layout } from './pages/shared/Layout';
import { TranslationProvider } from './translation/TranslationProvider';

export const App: Component = () => {
  return (
    <TranslationProvider>
      <Layout />
    </TranslationProvider>
  );
};
