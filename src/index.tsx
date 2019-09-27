import { History, LocationDescriptor } from "history";
import * as React from "react";
import {
  generatePath,
  matchPath,
  Route as ReactRouterRoute,
  RouteProps,
  useHistory,
  useLocation
} from "react-router";

import { Link as RouterLink, LinkProps } from "react-router-dom";

const { useMemo, useContext } = React;

export interface INamesakeHook {
  history: History;
  transitionTo(namedPath: string, params?: IParams): void;
}

export interface INamesakeRouter {
  Route(props: RouteProps): React.ReactElement;
  Switch(props: INamesakeSwitchProps): React.ReactElement | null;
  Link(props: LinkProps): React.ReactElement;
  useNamesake(): INamesakeHook;
}

export interface IParams {
  [paramName: string]: boolean | string | number;
}

export interface INamesakeRouteProps extends RouteProps {
  path?: string;
  params?: IParams;
}

export interface INamesakeLinkProps {
  children?: React.ReactNode;
  params?: IParams;
  to: string;
  replace?: boolean;
  innerRef?: React.Ref<any>;
}

export interface INamesakeSwitchProps {
  children: React.ReactElement | React.ReactElement[];
}

export interface IEnrichedChildren {
  exact?: boolean;
  strict?: boolean;
  path: string;
}

interface IContextProps {
  getPath(path: string, params?: IParams): string;
  routePath(path: string): string;
}
const Context = React.createContext<IContextProps>({
  getPath: (path: string, params?: IParams) => path,
  routePath: (path: string) => path
});

interface IRouteProviderProps {
  routes: { [routeName: string]: string };
  children: React.ReactNode;
}
export const NamedRoutes = ({ children, routes }: IRouteProviderProps) => {
  // TODO: memoize this
  const routePath = (path: string): string => {
    return routes[path] || path;
  };
  // TODO: memoize this
  const getPath = (path: string, params?: IParams): string => {
    return generatePath(routePath(path), params);
  };

  const value = useMemo(
    () => ({
      getPath,
      routePath
    }),
    [getPath, routePath]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Route = ({
  path: namedPath,
  params,
  ...props
}: INamesakeRouteProps): React.ReactElement => {
  const { routePath } = useContext(Context);
  const gen = (route?: string) => {
    if (!route) {
      return "";
    }
    return params ? generatePath(route, params) : routePath(route);
  };
  const path = Array.isArray(namedPath) ? namedPath.map(gen) : gen(namedPath);
  return <ReactRouterRoute {...props} path={path} />;
};

export const Link = ({
  to: namedPath,
  params,
  ...props
}: INamesakeLinkProps): React.ReactElement => {
  const { getPath } = useContext(Context);
  const path: LocationDescriptor = getPath(namedPath, params);
  return <RouterLink {...props} to={path} />;
};

export const Switch = ({
  children
}: INamesakeSwitchProps): React.ReactElement | null => {
  const { routePath } = useContext(Context);
  const location = useLocation();
  let element: React.ReactElement | null = null;
  let match: {} | null = null;
  React.Children.forEach(children, (child: React.ReactElement, idx) => {
    if (match || !React.isValidElement<IEnrichedChildren>(child)) {
      return;
    }
    element = child;
    const { exact, path, strict } = child.props;
    match = path
      ? matchPath(location.pathname, {
          exact,
          path: routePath(path),
          strict
        })
      : matchPath(location.pathname, {
          exact: false,
          path: "/",
          strict: false
        });
  });
  return match && element
    ? React.cloneElement(element, { location, computedMatch: match })
    : null;
};

export const useNamesake = (): INamesakeHook => {
  const { getPath } = useContext(Context);
  const history = useHistory();
  return {
    history,
    transitionTo: (namedPath: string, params: IParams): void => {
      const pathname = getPath(namedPath, params);
      history.push({
        pathname: Array.isArray(pathname) ? pathname[0] : pathname
      });
    }
  };
};
