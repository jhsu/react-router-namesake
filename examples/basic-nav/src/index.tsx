import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { NamedRoutes, Link, Route } from "react-router-namesake";

import "./styles.css";

const routes = {
  home: "/",
  about: "/about"
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
          <div>home path</div>
        </Route>
        <Route path="about">
          <div>about path</div>
        </Route>
      </div>
    </NamedRoutes>
  </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
