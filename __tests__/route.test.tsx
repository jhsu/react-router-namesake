import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { NamedRoutes, Route } from "../src";

test("render a link", () => {
  const routes = { home: "/home" };
  const { getByText } = render(
    <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
      <NamedRoutes routes={routes}>
        <Route exact path="home" render={() => <div>home</div>} />
      </NamedRoutes>
    </MemoryRouter>
  );
  expect(getByText("home")).toBeTruthy();
});
