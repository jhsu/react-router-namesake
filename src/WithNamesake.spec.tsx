import { mount,shallow } from 'enzyme';
import * as React from 'react';
import { NamesakeProvider } from './index';

import WithNamesake from './WithNamesake';

describe('WithNamesake', () => {
  it('should pass down routes', (done) => {
    const providerValue = 123;
    const Provider = ({ children }) => <NamesakeProvider value={providerValue}>{children}</NamesakeProvider>;
    mount(
      <Provider>
        <WithNamesake>{(value) => {
          expect(value).toEqual(providerValue);
          done()
        }}</WithNamesake>
      </Provider>
    );
  });
});
