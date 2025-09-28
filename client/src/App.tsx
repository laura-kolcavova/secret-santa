import type { Component } from 'solid-js';
import { TranslationProvider } from './translation/TranslationProvider';
import { LoggedUserProvider } from './authentication/LoggedUserProvider';
import { Route, Router } from '@solidjs/router';
import { pages } from './navigation/pages';
import { ProtectedRoute } from './navigation/ProtectedRoute';
import { Layout } from './pages/shared/Layout';
import { Toaster } from 'solid-toast';

export const App: Component = () => {
  return (
    <TranslationProvider>
      <LoggedUserProvider>
        <>
          <Toaster position="bottom-right" gutter={24} />
          <Router root={Layout}>
            <PagesRoutes />
          </Router>
        </>
      </LoggedUserProvider>
    </TranslationProvider>
  );
};

const PagesRoutes: Component = () => {
  return Object.values(pages).map((pageDefinition) =>
    pageDefinition.isProtected ? (
      <Route
        path={pageDefinition.paths}
        component={() => <ProtectedRoute component={pageDefinition.component} />}
      />
    ) : (
      <Route path={pageDefinition.paths} component={pageDefinition.component} />
    ),
  );
};
