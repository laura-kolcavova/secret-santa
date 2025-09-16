import { Route } from '@solidjs/router';
import { Component } from 'solid-js';
import { PageDefinitions } from '~/navigation/PageDefinitions';

export const PageDefinitionRoutes: Component = () => {
  return Object.values(PageDefinitions).map((pageDefinition) => (
    <Route path={pageDefinition.paths} component={pageDefinition.component} />
  ));
};
