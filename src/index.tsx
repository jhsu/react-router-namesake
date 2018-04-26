import * as React from 'react';
import { generatePath, Route  } from 'react-router-dom';

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
  transitionTo(routeName: string, params: {}, state: {}): void;
}

export class Router extends React.Component<INamesakeRouterProps, {}> {
  private static defaultProps = {
    routes: {},
  };

  public state = {
    routes: this.props.routes,

    route: (routeName: string, params={}): string => {
      const route = this.state.routes[routeName];
      if (route) {
        return generatePath(route, params);
      }
      throw new Error(`Unable to find route for '${routeName}'`);
    },

    transitionTo: (routeName: string, params={}, state={}): void => {
      this.props.push(this.state.route(routeName, params), state);
    },
  };

  public render() {
    const { children, routes, push, ...props } = this.props;
    return (
      <NamesakeProvider value={this.state}>
        {children}
      </NamesakeProvider>
    );
  }
}

export { NamesakeConsumer, NamesakeProvider, NamesakeLink, NamesakeRoute, WithNamesake };
