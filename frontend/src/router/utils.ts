import { matchPath } from 'react-router-dom';
import { Location } from 'history';

export const hasMatched = (location: Location, path: string, exact: boolean = true): boolean =>
  !!matchPath(location.pathname, { path, exact });
