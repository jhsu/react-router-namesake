import * as React from 'react';
import { generatePath, Route  } from 'react-router-dom';
import { Router } from './Router';

import NamesakeLink from './NamesakeLink';
import NamesakeRoute from './NamesakeRoute';
import WithNamesake from './WithNamesake';

const { Provider: NamesakeProvider, Consumer: NamesakeConsumer } = React.createContext({});

export interface INamesakeRouterProps {
  routes?: {
    [key: string]: string,
  };
  push?(routeName: string, state: {}): void;
}

export interface INamesakeRouterState {
  routes: {
    [key: string]: string,
  };
  route(routeName: string, params: {}): string;
  path(routeName: string): string;
  transitionTo(routeName: string, params: {}, state: {}): void;
}

export { NamesakeConsumer, NamesakeProvider, NamesakeLink, NamesakeRoute,  Router, WithNamesake };
