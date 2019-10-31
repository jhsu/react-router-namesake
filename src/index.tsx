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
import { Link as RouterLink } from "react-router-dom";

const { useCallback, useContext, useMemo } = React;

export interface IParams {
  [paramName: string]: boolean | string | number;
}

export interface IEnrichedChildren {
  exact?: boolean;
  strict?: boolean;
  path: string;
}

interface IContextProps {
  getPath(path?: string, params?: IParams): string;
  routePath(path: string): string;
}
const Context = React.createContext<IContextProps>({
  getPath: (path: string) => path,
  routePath: (path: string) => path
});

interface IRouteProviderProps {
  routes: { [routeName: string]: string };
  children: React.ReactNode;
}
export const NamedRoutes: React.FC<IRouteProviderProps> = ({
  children,
  routes
}) => {
  const routePath = useCallback(
    (path: string): string => {
      return routes[path] || path;
    },
    [routes]
  );
  const getPath = useCallback(
    (route?: string, params?: IParams) => {
      if (!route) {
        return "";
      }
      return params ? generatePath(route, params) : routePath(route);
    },
    [routePath]
  );

  const value = useMemo(
    () => ({
      getPath,
      routePath
    }),
    [getPath, routePath]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export interface INamesakeRouteProps extends RouteProps {
  path?: string;
  params?: IParams;
}
export const Route: React.FC<INamesakeRouteProps> = ({
  path: namedPath,
  params,
  ...props
}) => {
  const { getPath } = useContext(Context);
  return <ReactRouterRoute {...props} path={getPath(namedPath, params)} />;
};

export interface INamesakeLinkProps {
  children?: React.ReactNode;
  params?: IParams;
  to: string;
  replace?: boolean;
  innerRef?: React.Ref<any>;
}

export const Link: React.FC<INamesakeLinkProps> = ({
  to: namedPath,
  params,
  ...props
}) => {
  const { getPath } = useContext(Context);
  const path: LocationDescriptor = getPath(namedPath, params);
  return <RouterLink {...props} to={path} />;
};

export interface INamesakeSwitchProps {
  children: React.ReactElement | React.ReactElement[];
}
export const Switch: React.FC<INamesakeSwitchProps> = ({ children }) => {
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

export interface INamesakeHook {
  history: History;
  transitionTo(namedPath: string, params?: IParams): void;
}
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
