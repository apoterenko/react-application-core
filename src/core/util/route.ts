import * as R from 'ramda';
import * as URI from 'urijs';

import {
  IEntity,
  IKeyValue,
  NEW_OPTION,
  UNDEF,
} from '../definitions.interface';
import {
  IConnectorEntity,
  IRouteConfigurationEntity,
} from '../definition';
import { calc } from './calc';

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
 * @stable [11.04.2020]
 * @param {IRouteConfigurationEntity} entity
 * @returns {string}
 */
export const getRoutePath = (entity: IRouteConfigurationEntity): string =>
  R.isNil(entity) ? UNDEF : calc(entity.routeConfiguration.path);

/**
 * @stable [11.09.2019]
 * @param {string} section
 * @param {Map<string, >} connectorConfigs
 * @returns {string}
 */
export const getRoutePathBySection = (section: string, connectorConfigs: Map<string, IConnectorEntity>): string => {
  let routePath: string = null;
  connectorConfigs.forEach((connectorConfig, currentSection) => {
    if (currentSection === section) {
      routePath = getRoutePath(connectorConfig);
    }
  });
  return routePath;
};

/**
 * @stable [07.06.2020]
 */
export class RouteUtils {
  public static readonly buildEntityRoute = buildEntityRoute;               /* @stable [07.06.2020] */
}
