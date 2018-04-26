import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { MemoryRouter as Router } from 'react-router';

import { NamesakeProvider } from './index';
import NamesakeRoute from './NamesakeRoute';

describe('NamesakeRoute', () => {
  it('should pass down routes', (done) => {
    const Provider = ({ children }) => {
      return <NamesakeProvider value={{
        route(name: string, params: {}) {
          expect(name).toEqual('home.path');
          expect(params).toEqual({ id: 1 });
          done();
        },
      }}>{children}</NamesakeProvider>;
    }
    const wrapper = mount(
      <Router>
        <Provider>
          <NamesakeRoute path='home.path'></NamesakeRoute>
        </Provider>
      </Router>
    );
  });
});
