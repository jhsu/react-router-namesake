import { History } from 'history';
import * as React from 'react';
import { RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import { INamesakeRouterState, NamesakeConsumer } from './index';

export interface IWithNamesakeRoute extends RouteProps {
  path: string;
  params?: {
    [key: string]: any,
  };
  children?(params: { routes: INamesakeRouterState, history: History }): React.ReactNode;
}

export default class NamesakeRoute extends React.Component<IWithNamesakeRoute, {}> {
  public render() {
    const { path, params, ...routeParams } = this.props;
    return (<NamesakeConsumer>{
      (routes: INamesakeRouterState) => (<Route path={routes.path(path)} {...routeParams} />)
    }</NamesakeConsumer>);
  }
}
