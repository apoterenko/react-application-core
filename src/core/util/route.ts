import * as R from 'ramda';

import {
  IEntity,
  IKeyValue,
  UNDEF,
} from '../definitions.interface';
import {
  DefaultEntities,
  IConnectorEntity,
  IRouteConfigurationEntity,
} from '../definition';
import { CalcUtils } from './calc';

export function buildRoute(path: string, params: IKeyValue): string {
  (path.match(/\:[a-zA-Z0-9]+/g) || []).forEach((placeholder) => {
    path = path.replace(placeholder, params[placeholder.substring(1, placeholder.length)]);
  });
  return path;
}

/**
 * @stable [10.09.2020]
 * @param path
 * @param entity
 */
export const buildEntityRoute = <TEntity extends IEntity>(path: string,
                                                          entity?: TEntity): string =>
  buildRoute(path, {id: entity ? entity.id : DefaultEntities.NEW});

/**
 * @stable [10.09.2020]
 * @param entity
 */
const asRoutePath = (entity: IRouteConfigurationEntity): string =>
  R.isNil(entity) ? UNDEF : CalcUtils.calc(entity.routeConfiguration.path);

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
      routePath = asRoutePath(connectorConfig);
    }
  });
  return routePath;
};

/**
 * @stable [07.06.2020]
 */
export class RouteUtils {
  public static readonly asRoutePath = asRoutePath;                         /* @stable [10.09.2020] */
  public static readonly buildEntityRoute = buildEntityRoute;               /* @stable [07.06.2020] */
}
