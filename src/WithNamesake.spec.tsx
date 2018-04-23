import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter, withRouter } from 'react-router';
import { Router as RouterPlain, NamesakeProvider, WithNamesake } from './index';

const Router = withRouter(RouterPlain);

// function provide(content: any) {
//   // return mount(<div><MemoryRouter><Router>{content}</Router></MemoryRouter></div>);
//   return mount(content);
// }

// enzyme doesn't understand new Context and Provider

describe('WithNamesake', () => {
  it('should pass down routes', (done) => {
    const wrapper = mount(<div>
      <NamesakeProvider value={{}}>
      </NamesakeProvider>
    </div>);
  });

      // <NamesakeProvider value={{ routes: {} }}>
      //   <WithNamesake>{({ routes }: { routes: {} }) => {
      //     console.log('hello');
      //     expect(routes).toBeTruthy();
      //     done();
      //     return <div></div>;
      //   }}</WithNamesake>
      // </NamesakeProvider>
});
