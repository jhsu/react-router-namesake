import * as React from 'react';
import { NamesakeConsumer } from './index';
// import { Route } from 'react-router-dom';

export interface IWithNamesakeProps {
  children(props: any): any;
}

export default class WithNamesake extends React.Component<IWithNamesakeProps, {}> {
  public render() {
    return <NamesakeConsumer>{(routes) => this.props.children(routes)}</NamesakeConsumer>;
  }
}
