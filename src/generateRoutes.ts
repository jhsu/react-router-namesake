export interface IRoutesConfig {
  [key: string]: string;
}

export default function generateRoutes(routes: {}, prefix?: string, basePath?: string): IRoutesConfig {
  let result: IRoutesConfig = {};
  for (const key of Object.keys(routes)) {
    const routeName = prefix ? `${prefix}.${key}` : key;
    if (routes[key] instanceof Object) {
      const path = prefix ? `${basePath}${routes[key].path}` : routes[key].path;
      result[routeName] = path;

      const childRoutes = generateRoutes(routes[key].children || {}, routeName, path);
      result = {...result, ...childRoutes};
    } else {
      const path = prefix ? `${basePath}${routes[key]}` : routes[key];
      result[routeName] = path;
    }
  }
  return result;
}
