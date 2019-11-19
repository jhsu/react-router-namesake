![react-router-namesake logo](logo.png)

Named routes for react-router.

This depends on `react-router >= 5.1.0` for its react hooks api.

# react-router-namesake
[![Build Status](https://travis-ci.org/jhsu/react-router-namesake.svg?branch=v1.0)](https://travis-ci.org/jhsu/react-router-namesake)


## Example

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { NamedRoutes, Link, Route, Switch } from 'react-router-namesake';

const routes = {
  home: "/",
  about: "/about",
  page: "/pages/:pageId"
};

const App = () => {
  const { transitionTo } = useNamesake();
  return (
    <BrowserRouter>
      <NamedRoutes routes={routes}>
        <nav>
          <Link to="home">home</Link>
          <Link to="about">about</Link>
          <Link to="page" params={{ pageId: 1 }}>
            page 1
          </Link>
          <button onClick={() => void transitionTo("home")}>go home</button>
        </nav>
        <div>
          <Switch>
            <Route exact path="home" render={() => <div>home</div>} />
            <Route exact path="about" render={() => <div>about</div>} />
            <Route
              exact
              path="page"
              params={{ pageId: 1 }}
              render={() => <div>page 1</div>}
            />
          </Switch>
        </div>
      </NamedRoutes>
    </BrowserRouter>
  );
};
```

[demo](https://codesandbox.io/s/fervent-matsumoto-3fi7n)
