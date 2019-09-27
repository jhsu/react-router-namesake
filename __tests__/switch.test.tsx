import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { NamedRoutes, Route, Switch } from "../src";

const routes = {
  home: "/home",
  root: "/",
  test: "/test"
};

test("renders switch fallback", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/tes"]} initialIndex={0}>
      <NamedRoutes routes={routes}>
        <Switch>
          <Route exact path="test">
            <div>skip this path</div>
          </Route>
          <Route>
            <div>fallback</div>
          </Route>
        </Switch>
      </NamedRoutes>
    </MemoryRouter>
  );

  expect(getByText("fallback")).toBeTruthy();
});

test("renders the first switch match", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/test"]} initialIndex={0}>
      <NamedRoutes routes={routes}>
        <Switch>
          <Route exact path="test">
            <div>test success</div>
          </Route>
          <Route>
            <div>fallback</div>
          </Route>
        </Switch>
      </NamedRoutes>
    </MemoryRouter>
  );

  expect(getByText("test success")).toBeTruthy();
});

test("switch doesn't block", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/test"]} initialIndex={0}>
      <NamedRoutes routes={routes}>
        <Switch>
          <Route exact path="root">
            <div>root</div>
          </Route>
          <Route exact path="test">
            <div>test success</div>
          </Route>
        </Switch>
      </NamedRoutes>
    </MemoryRouter>
  );

  expect(getByText("test success")).toBeTruthy();
});
