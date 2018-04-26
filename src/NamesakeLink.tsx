import * as React from 'react';
import { Link } from 'react-router-dom';

import WithNamesake from './WithNamesake';

export interface INamesakeLink {
  to: string;
  params?: {};
}

export default class NamesakeLink extends React.Component<INamesakeLink, {}> {
  public render() {
    const { to, params, ...linkProps } = this.props;
    return <WithNamesake>{(routes) => <Link to={routes.route(to, params)} {...linkProps} />}</WithNamesake>;
  }
}
