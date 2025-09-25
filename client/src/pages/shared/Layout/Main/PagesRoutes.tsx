import { Route } from '@solidjs/router';
import { Component } from 'solid-js';
import { pages } from '~/navigation/pages';
import { ProtectedRoute } from '~/navigation/ProtectedRoute';

export const PagesRoutes: Component = () => {
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
