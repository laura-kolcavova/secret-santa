import { Router } from '@solidjs/router';
import { Component } from 'solid-js';
import { PagesRoutes } from './PagesRoutes';

export const Main: Component = () => {
  return (
    <main class="flex-auto">
      <Router>
        <PagesRoutes />
      </Router>
    </main>
  );
};
