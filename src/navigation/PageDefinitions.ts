import { LogIn } from '~/pages/LogIn';
import { Page } from './Page';
import { PageDefinition } from './PageDefinition';
import { NewProfile } from '~/pages/NewProfile';
import { MyProfile } from '~/pages/MyProfile';

type PageDefinitionsType = {
  [key in Page]: PageDefinition;
};

export const PageDefinitions: PageDefinitionsType = {
  [Page.LogIn]: {
    paths: ['login', '/'],
    component: LogIn,
  },
  [Page.NewProfile]: {
    paths: ['new-profile'],
    component: NewProfile,
  },
  [Page.MyProfile]: {
    paths: ['my-profile'],
    component: MyProfile,
  },
};
