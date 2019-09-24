import { History, Location, LocationDescriptor } from "history";
import * as React from "react";
import {
  generatePath,
  Link,
  LinkProps,
  matchPath,
  Route,
  RouteProps
} from "react-router-dom";

export interface INamesakeHook {
  history: History;
  transitionTo(namedPath: string, params?: IParams): void;
}

export interface INamesakeRouter {
  getPath: (path: string, params: IParams) => string;
  Route(props: RouteProps): React.ReactElement;
  Switch(props: INamesakeSwitchProps): React.ReactElement;
  Link(props: LinkProps): React.ReactElement;
  useNamesake(): INamesakeHook;
}

export interface IParams {
  [paramName: string]: boolean | string | number;
}

export interface INamesakeRouteProps extends RouteProps {
  path: string;
  params?: IParams;
}

export interface INamesakeLinkProps {
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

const createRouter = (
  routes: { [key: string]: string } = {},
  history: History
): INamesakeRouter => {
  const getPath = (path: string, params: IParams = {}): string => {
    return generatePath(routePath(path), params);
  };
  const routePath = (path: string): string => {
    return routes[path];
  };

  const NamesakeRoute = ({
    path: namedPath,
    params,
    ...props
  }: INamesakeRouteProps): React.ReactElement => {
    const path = Array.isArray(namedPath)
      ? namedPath.map(p => routePath(namedPath))
      : routePath(namedPath);
    return <Route {...props} path={path} />;
  };

  const NamesakeLink = ({
    to: namedPath,
    params,
    ...props
  }: INamesakeLinkProps): React.ReactElement => {
    const path: LocationDescriptor = getPath(namedPath, params);
    return <Link {...props} to={path} />;
  };

  const NamesakeSwitch = ({
    children
  }: INamesakeSwitchProps): React.ReactElement => {
    return (
      <Route
        render={({ location }) => {
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
                  strict,
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
        }}
      />
    );
  };

  const useNamesake = (): INamesakeHook => {
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

  return {
    Link: NamesakeLink,
    Route: NamesakeRoute,
    Switch: NamesakeSwitch,
    getPath,
    useNamesake
  };
};

export default createRouter;
