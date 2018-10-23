import * as React from "react";
import { generatePath } from "react-router-dom";
import { INamesakeRouterProps, NamesakeProvider } from "./index";

export class Router extends React.Component<INamesakeRouterProps, {}> {
  private static defaultProps = {
    routes: {},
  };

  public state = {
    path: (routeName: string): string => {
      const route = this.state.routes[routeName];
      if (!route) {
        throw new Error(`Unable to find route for '${routeName}'`);
      }
      return route;
    },

    routes: this.props.routes,

    route: (routeName: string, params={}): string => {
      const route = this.state.routes[routeName];
      if (!route) {
        throw new Error(`Unable to find route for '${routeName}'`);
      }
      return generatePath(route, params);
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
