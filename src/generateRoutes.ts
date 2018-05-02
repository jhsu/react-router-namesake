export interface IRoutesConfig {
  [key: string]: string;
}

function reduce(obj, prefix=null, basePath=null) {
  let result = {};
  for (const key of Object.keys(obj)) {
    const routeName = prefix ? `${prefix}.${key}` : key;
    if (obj[key] instanceof Object) {
      const path = prefix ? `${basePath}${obj[key].path}` : obj[key].path;
      result[routeName] = path;

      const childRoutes = reduce(obj[key].children || {}, routeName, path);
      result = {...result, ...childRoutes};
    } else {
      const path = prefix ? `${basePath}${obj[key]}` : obj[key];
      result[routeName] = path;
    }
  }
  return result;
}

export default function generateRoutes(routes: {}): IRoutesConfig {
  return reduce(routes);
}
