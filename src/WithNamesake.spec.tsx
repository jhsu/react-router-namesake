import { mount,shallow } from 'enzyme';
import * as React from 'react';
import { NamesakeConsumer, NamesakeProvider, Router, WithNamesake } from './index';

describe('WithNamesake', () => {
  it('should pass down routes', (done) => {
    const routeConfig = {
      'hello': '/hello',
    };
    const wrapper = mount(
      <Router routes={routeConfig}>
        <NamesakeConsumer>{(routes: { route(routeName: string): string }) => {
          expect(routes.route('hello')).toEqual(routeConfig.hello);
          done();
        }}</NamesakeConsumer>
      </Router>
    );
  });
});
