import * as React from 'react';
import { NamesakeConsumer } from './index';

export interface IWithNamesakeProps {
  children(props: {}): React.ReactNode;
}

export class WithNamesake extends React.Component<IWithNamesakeProps, {}> {
  public render() {
    return <NamesakeConsumer>{(routes) => this.props.children({ routes })}</NamesakeConsumer>;
  }
}
