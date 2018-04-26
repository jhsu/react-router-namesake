import { mount, shallow } from 'enzyme';
import { History } from 'history';
import * as React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Route } from 'react-router-dom';

import { NamesakeProvider, Router as NamesakeRouter } from './index';
import NamesakeLink from './NamesakeLink';
import NamesakeRoute from './NamesakeRoute';

const App = ({ children, routes }) => {
  return <Router><Route>{({ history }: { history: History }) => {
    return <NamesakeRouter push={history.push} routes={routes}>{children}</NamesakeRouter>
  }}</Route></Router>
};

describe('NamesakeLink', () => {
  it('should render a link with the correct path', () => {
    const routes = {
      'home': '/home/path/thing',
    };
    const wrapper = mount(
      <App routes={routes}>
        <NamesakeLink to='home' />
      </App>
    );
    const link = wrapper.find('Link');
    expect(link.prop('to')).toEqual(routes.home);
  });
});
