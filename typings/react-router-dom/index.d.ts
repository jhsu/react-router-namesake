import * as ReactRouterDom from 'react-router-dom';
declare module 'react-router-dom' {
  export function generatePath(path: string, params: object): string;
}

