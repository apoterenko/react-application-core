import * as R from 'ramda';
import * as URI from 'urijs';

import { IEntity, IKeyValue, NEW_OPTION } from '../definitions.interface';

export function buildRoute(path: string, params: IKeyValue): string {
  (path.match(/\:[a-zA-Z0-9]+/g) || []).forEach((placeholder) => {
    path = path.replace(placeholder, params[placeholder.substring(1, placeholder.length)]);
  });
  return path;
}

/**
 * @stable [01.12.2018]
 * @param {string} path
 * @returns {string}
 */
export const buildNormalizedPath = (path: string): string => URI('/').segment(new URI(path).segment()).toString() || '/';

/**
 * @stable [21.08.2018]
 * @param {string} path
 * @param {TEntity} entity
 * @param {IKeyValue} params
 * @returns {string}
 */
export const buildEntityRoute = <TEntity extends IEntity>(path: string,
                                                          entity?: TEntity,
                                                          params?: IKeyValue): string =>
  buildRoute(path, {id: entity ? entity.id : NEW_OPTION, ...params});

/**
 * @stable [23.10.2018]
 * @param {string} path
 * @param {IKeyValue} routes
 * @returns {{route: string; bindings: IKeyValue}}
 */
export const findUrlPattern = (path = '', routes: IKeyValue): { route: string, bindings: IKeyValue } => {
  const bindings = {};
  const currentUriPathParts = new URI(path).path().split('/');
  let currentRoute = null;

  R.forEachObjIndexed<IKeyValue>((value, routePattern) => {
    const currentRouteUriParts = new URI(routePattern as string).path().split('/');

    if (currentRouteUriParts.length === currentUriPathParts.length) {
      currentRouteUriParts.forEach((currentRouteUriPart, index) => {
        const currentUriPathPart = currentUriPathParts[index];

        if (currentRouteUriPart.startsWith(':')) {
          bindings[currentRouteUriPart] = currentUriPathPart;
        } else if (currentRouteUriPart !== currentUriPathPart) {
          currentRoute = false;
        }
      });

      if (currentRoute !== false && R.isNil(currentRoute)) {
        currentRoute = routePattern;
      }
    }
  }, routes);

  return {
    route: currentRoute,
    bindings,
  };
};
