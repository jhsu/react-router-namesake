import * as React from 'react';
import { Route, generatePath } from 'react-router-dom';

const { Provider: NamesakeProvider, Consumer: NamesakeConsumer } = React.createContext({});

export interface NamesakeRouterProps {
  push: Function,
  routes: {
    [key: string]: string,
  };
}

export interface NamesakeRouterState {
  routes: {
    [key: string]: string,
  };
  route(routeName: string, params: {}): string;
  transitionTo(routeName: string, params: {}, state: {}): void;
}

export class Router extends React.Component<NamesakeRouterProps, {}> {
  static defaultProps = {
    routes: {},
  };

  state = {
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

  render() {
    return (
      <NamesakeProvider value={this.state}>
        {this.props.children}
      </NamesakeProvider>
    );
  }
}

export interface WithNamesakeProps {
  children(): React.ReactNode[];
}

export class WithNamesake extends React.Component<WithNamesakeProps, {}> {
  render() {
    return <Route>
      {({ history }) => {
        <NamesakeConsumer>{(routes) => this.props.children()}</NamesakeConsumer>
      }}
    </Route>

  }
}
