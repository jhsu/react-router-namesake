import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { Link, NamedRoutes } from "../src";

test("render a link", () => {
  const routes = { home: "/home" };
  const { getByText } = render(
    <MemoryRouter>
      <NamedRoutes routes={routes}>
        <Link to="home">go home</Link>
      </NamedRoutes>
    </MemoryRouter>
  );
  expect(getByText("go home")).toBeTruthy();
});
