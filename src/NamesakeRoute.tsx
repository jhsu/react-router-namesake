import { History } from 'history';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { INamesakeRouterState, NamesakeConsumer } from './index';

export interface IWithNamesakeRoute {
  to: string;
  params?: {
    [key: string]: any,
  };
  children?(params: { routes: INamesakeRouterState, history: History }): React.ReactNode;
}

export default class WithNamesakeRoute extends React.Component<IWithNamesakeRoute, {}> {
  public render() {
    const { to, params, ...routeParams } = this.props;
    return (<NamesakeConsumer>{
      (routes: INamesakeRouterState) => (<Route path={routes.route(to, params)} {...routeParams} />)
    }</NamesakeConsumer>);
 }
}
