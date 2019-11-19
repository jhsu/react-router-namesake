import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  useNamesake,
  NamedRoutes,
  Link,
  Route,
  Switch
} from "react-router-namesake";

import "./styles.css";

const routes = {
  about: "/about",
  home: "/",
  pages: "/pages",
  "page.show": "/pages/:page/show"
};

interface ButtonProps {
  children: React.ReactNode;
  to: string;
  params?: {};
}
const Button: React.FC<ButtonProps> = ({ children, to, params = {} }) => {
  const { transitionTo } = useNamesake();

  return <button onClick={() => transitionTo(to, params)}>{children}</button>;
};

function App() {
  return (
    <BrowserRouter>
      <NamedRoutes routes={routes}>
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <Link to="home">home</Link> | <Link to="about">about</Link>
          <Route exact path="home">
            <div>
              home path
              <Button to="page.show" params={{ page: 123 }}>
                see page 123
              </Button>
            </div>
          </Route>
          <Route path="about">
            <div>
              about path
              <Button to="home">back home</Button>
            </div>
          </Route>
          <Switch>
            <Route path="page.show">
              <div>
                show page
                <Button to="home">back home</Button>
                <Button to="pages">go to pages index</Button>
              </div>
            </Route>
            <Route path="pages">
              <div>pages index</div>
            </Route>
          </Switch>
        </div>
      </NamedRoutes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
