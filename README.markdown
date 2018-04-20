# react-router-namesake


## Example

```jsx
import { Router as NamesakeRouter, WithNamesake } from "react-router-namesake";
import { Switch } from "react-router";
import { BrowserRouter, Route, Link } from "react-router-dom";

const NamedLink = ({ to, params, ...props }) => {
  return (
    <WithNamesake>
      {({ routes  }) => <Link to={routes.route(to, params)} {...props} />}
    </WithNamesake>
  );
};

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
              <NamedLink to="home">Home</NamedLink>
              <NamedLink to="users">users</NamedLink>
              <NamedLink to="user" params={{ userId: 123 }}>
                user id 123
              </NamedLink>
            </nav>

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
