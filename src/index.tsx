import { History, Location, LocationDescriptor } from "history";
import * as React from "react";
import {
  generatePath,
  Link,
  LinkProps,
  Route,
  RouteProps
} from "react-router-dom";

export interface INamesakeHook {
  history: History;
  transitionTo(namedPath: string, params?: IParams): void;
}

export interface INamesakeRouter {
  Route(props: RouteProps): React.ReactElement;
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
type Blah = string;

const createRouter = (
  routes: { [key: string]: string } = {},
  history: History
): INamesakeRouter => {
  const getPath = (paths: string, params: IParams = {}): string => {
    return generatePath(routes[paths], params);
  };

  const NamesakeRoute = ({
    path: namedPath,
    params,
    ...props
  }: INamesakeRouteProps): React.ReactElement => {
    const path = Array.isArray(namedPath)
      ? namedPath.map(p => getPath(namedPath, params))
      : getPath(namedPath, params);
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

  return { Route: NamesakeRoute, Link: NamesakeLink, useNamesake };
};

export default createRouter;
