import { Route } from '@solidjs/router';
import { Component } from 'solid-js';
import { pages } from '~/navigation/pages';

export const PagesRoutes: Component = () => {
  return Object.values(pages).map((pageDefinition) => (
    <Route path={pageDefinition.paths} component={pageDefinition.component} />
  ));
};
