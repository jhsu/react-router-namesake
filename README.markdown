![react-router-namesake logo](logo.png)

# react-router-namesake
[![Build Status](https://travis-ci.org/jhsu/react-router-namesake.svg?branch=master)](https://travis-ci.org/jhsu/react-router-namesake)


## Example

```jsx
import { Switch } from "react-router";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Router as NamesakeRouter, WithNamesake, NamesakeLink, NamesakeRoute } from "react-router-namesake";

const ButtonLink = ({ to, params }) => {
  return <WithNamesake>{({ routes }) => (
    <button onClick={() => routes.transitionTo(path, params)}>{this.props.children}</button>
  )}</WithNamesake>;
}

const App = () => (
  <div>
    <BrowserRouter>
      <Route>{({ history }) => (
        <NamesakeRouter
          push={history.push}
          routes={{
            home: "/home",
            users: "/users",
            user: "/users/:userId"
          }}
        >
          <div>
            <nav>
              <NamesakeLink to="home">Home</NamesakeLink>
              <NamesakeLink to="users">users</NamesakeLink>
              <NamesakeLink to="user" params={{ userId: 123 }}>
                user id 123
              </NamesakeLink>
            </nav>

            <NamesakeRoute exact path='user'>
              <p>This renders for /user/:userId</p>
            </NamesakeRoute>

            <ButtonLink to='user' params={{ userId: 123 }}>Go to User 123</ButtonLink>

            <Switch>
              <Route exact path="/home">
                <h2>Home</h2>
              </Route>
              <Route exact path="/users">
                <h2>Users Page</h2>
              </Route>
              <Route exact path="/users/:userId">
                <h2>A User's Page</h2>
              </Route>
            </Switch>
          </div>
        </NamesakeRouter>
      )}</Route>
    </BrowserRouter>
  </div>
);
```

[demo](https://codesandbox.io/s/2o6mv5nx5p)
