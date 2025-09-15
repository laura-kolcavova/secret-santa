import { Router } from '@solidjs/router';
import { Component } from 'solid-js';
import { PageDefinitionRoutes } from './PageDefinitionRoutes';

export const Main: Component = () => {
  return (
    <main class="flex-auto">
      <Router>
        <PageDefinitionRoutes />
      </Router>
    </main>
  );
};
