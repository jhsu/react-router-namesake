import * as React from 'react';
import { NamesakeConsumer } from './index';
// import { Route } from 'react-router-dom';

export interface IWithNamesakeProps {
  children(props: {}): React.ReactNode;
}

export default class WithNamesake extends React.Component<IWithNamesakeProps, {}> {
  public render() {
    return <NamesakeConsumer>{(routes) => this.props.children(routes)}</NamesakeConsumer>;
  }
}

// export class WithNamesakeRoute extends React.Component<{}, {}> {
//  public render() {
//    return <Route>{(...routeProps) => (<NamesakeConsumer>{(routes) => this.props.children({ ...routeProps, routes })}</NamesakeConsumer>)}</Route>;
//  }
// }
