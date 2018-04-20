import React from 'react';

const { Provider, Consumer } = React.createContext({});  

export { Provider };

class Router extends React.Component {
  static defaultProps = {
    routes: {},
  };
  
  state = {
    routes: this.props.routes,
  };

  render() {
    return <Route></Route>;
  }
}
