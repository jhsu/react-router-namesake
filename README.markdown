![react-router-namesake logo](logo.png)

# react-router-namesake
[![Build Status](https://travis-ci.org/jhsu/react-router-namesake.svg?branch=v1.0)](https://travis-ci.org/jhsu/react-router-namesake)


## Example

```jsx
const history = createBrowserHistory();
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import createRouter from 'react-router-namesake';

const routes = {
  home: "/",
  about: "/about",
  page: "/pages/:pageId"
};

const { Route, Link, useNamesake } = createRouter(routes, history);

const App = () => {
  const { transitionTo } = useNamesake();
  return (
    <Router history={history}>
      <nav>
        <Link to="home">home</Link>
        <Link to="about">about</Link>
        <Link to="page" params={{ pageId: 1 }}>
          page 1
        </Link>
        <button onClick={() => void transitionTo("home")}>go home</button>
      </nav>
      <div>
        <Route exact path="home" render={() => <div>home</div>} />
        <Route exact path="about" render={() => <div>about</div>} />
        <Route
          exact
          path="page"
          params={{ pageId: 1 }}
          render={() => <div>page 1</div>}
        />
      </div>
    </Router>
  );
};
```

[demo](https://codesandbox.io/s/fervent-matsumoto-3fi7n)
