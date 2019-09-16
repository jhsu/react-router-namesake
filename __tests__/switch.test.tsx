import { render } from "@testing-library/react";
import { createBrowserHistory, History } from "history";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import createRouter from "../src";

let history: History;

beforeEach(() => {
  history = createBrowserHistory();
});

const routes = {
  home: "/home",
  test: "/test"
};

test("renders switch fallback", () => {
  const { Route, Switch } = createRouter(routes, history);

  const { getByText } = render(
    <MemoryRouter initialEntries={["/tes"]} initialIndex={0}>
      <Switch>
        <Route exact path="test">
          <div>skip this path</div>
        </Route>
        <Route>
          <div>fallback</div>
        </Route>
      </Switch>
    </MemoryRouter>
  );

  expect(getByText("fallback")).toBeTruthy();
});

test("renders the first switch match", () => {
  const { Route, Switch } = createRouter(routes, history);

  const { getByText } = render(
    <MemoryRouter initialEntries={["/test"]} initialIndex={0}>
      <Switch>
        <Route exact path="test">
          <div>test success</div>
        </Route>
        <Route>
          <div>fallback</div>
        </Route>
      </Switch>
    </MemoryRouter>
  );

  expect(getByText("test success")).toBeTruthy();
});
