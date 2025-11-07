import userRoles from '~/utils/userRoles';
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
    isProtected: false,
    roles: [],
  },
  [Page.NewProfile]: {
    paths: ['/new-profile'],
    component: lazy(() =>
      import('~/pages/NewProfile').then((module) => ({ default: module.NewProfile })),
    ),
    isProtected: false,
    roles: [],
  },
  [Page.Overview]: {
    paths: ['/overview'],
    component: lazy(() =>
      import('~/pages/Overview').then((module) => ({ default: module.Overview })),
    ),
    isProtected: true,
    roles: [],
  },
  [Page.MyProfile]: {
    paths: ['/my-profile'],
    component: lazy(() =>
      import('~/pages/MyProfile').then((module) => ({ default: module.MyProfile })),
    ),
    isProtected: true,
    roles: [],
  },
  [Page.ChangePin]: {
    paths: ['/change-pin'],
    component: lazy(() =>
      import('~/pages/ChangePin').then((module) => ({ default: module.ChangePin })),
    ),
    isProtected: true,
    roles: [],
  },
  [Page.DrawGroups]: {
    paths: ['/draw-groups'],
    component: lazy(() =>
      import('~/pages/DrawGroups').then((module) => ({ default: module.DrawGroups })),
    ),
    isProtected: true,
    roles: [userRoles.DrawGroupManager],
  },
  [Page.NotFound]: {
    paths: ['*'],
    component: lazy(() =>
      import('~/pages/NotFound').then((module) => ({ default: module.NotFound })),
    ),
    isProtected: false,
    roles: [],
  },
};
