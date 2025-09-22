import { Page } from './Page';
import { PageDefinition } from './PageDefinition';
import { lazy } from 'solid-js';

type PageDefinitions = {
  [key in Page]: PageDefinition;
};

export const pages: PageDefinitions = {
  [Page.LogIn]: {
    paths: ['/login', '/'],
    component: lazy(() => import('~/pages/LogIn').then((module) => ({ default: module.LogIn }))),
  },
  [Page.NewProfile]: {
    paths: ['/new-profile'],
    component: lazy(() =>
      import('~/pages/NewProfile').then((module) => ({ default: module.NewProfile })),
    ),
  },
  [Page.Overview]: {
    paths: ['/users/:email'],
    component: lazy(() =>
      import('~/pages/Overview').then((module) => ({ default: module.Overview })),
    ),
  },
  [Page.MyProfile]: {
    paths: ['/users/:email/my-profile'],
    component: lazy(() =>
      import('~/pages/MyProfile').then((module) => ({ default: module.MyProfile })),
    ),
  },
  [Page.NotFound]: {
    paths: ['*'],
    component: lazy(() =>
      import('~/pages/NotFound').then((module) => ({ default: module.NotFound })),
    ),
  },
};
