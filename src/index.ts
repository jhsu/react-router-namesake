import * as React from 'react';
import { Route, generatePath } from 'react-router-dom';

const { Provider: NamesakeProvider, Consumer } = React.createContext({});

export { NamesakeProvider };

export class Router extends React.Component<IRouterProps> {
  static defaultProps = {
    routes: {},
  };

  state = {
    routes: this.props.routes,

    route: (routeName, params={}) => {
      const route = this.state.routes[routeName];
      if (route) {
        return generatePath(route, params);
      }
      throw new Error(`Unable to find route for '${routeName}'`);
    },

    transitionTo: (routeName, params={}, state={}) => {
      this.props.push(this.route(rotueName, params), state);
    },
  };

  render() {
    return (
      <NamesakeProvider value={this.state}>
        {this.props.children}
      </NamesakeProvider>
    );
  }
}

// export class WithNamesake extends React.Component {
//   render() {
//     return <Route>
//       {({ history }) => {
//         <Consumer>{(routes) => this.props.children()}</Consumer>
//       }}
//     </Route>

//   }
// }
