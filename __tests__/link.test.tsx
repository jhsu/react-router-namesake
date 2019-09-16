import { render } from "@testing-library/react";
import { createBrowserHistory, History } from "history";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import createRouter from "../src";

let history: History;

beforeEach(() => {
  history = createBrowserHistory();
});

test("render a link", () => {
  const routes = { home: "/home" };
  const { Link } = createRouter(routes, history);
  const { getByText } = render(
    <MemoryRouter>
      <Link to="home">go home</Link>
    </MemoryRouter>
  );
  expect(getByText("go home")).toBeTruthy();
});
