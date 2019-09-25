import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import createRouter from "../src";

test("render a link", () => {
  const routes = { home: "/home" };
  const { Link } = createRouter(routes);
  const { getByText } = render(
    <MemoryRouter>
      <Link to="home">go home</Link>
    </MemoryRouter>
  );
  expect(getByText("go home")).toBeTruthy();
});
