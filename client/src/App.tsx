import { ErrorBoundary, type Component } from 'solid-js';
import { TranslationProvider } from './translation/TranslationProvider';
import { LoggedUserProvider } from './authentication/LoggedUserProvider';
import { Route, Router } from '@solidjs/router';
import { pages } from './navigation/pages';
import { ProtectedRoute } from './navigation/ProtectedRoute';
import { Layout } from './pages/shared/Layout';
import { ErrorFallback } from './pages/shared/ErrorFallback';

export const App: Component = () => {
  return (
    <TranslationProvider>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <LoggedUserProvider>
          <Router root={Layout}>
            <PagesRoutes />
          </Router>
        </LoggedUserProvider>
      </ErrorBoundary>
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
