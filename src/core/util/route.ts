import * as URI from 'urijs';

import {
  IEntity,
  IKeyValue,
  NEW_OPTION,
} from '../definitions.interface';
import { IConnectorEntity } from '../definition';
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
 * @stable [11.09.2019]
 * @param {string} section
 * @param {Map<string, >} connectorConfigs
 * @returns {string}
 */
export const getRoutePathBySection = (section: string, connectorConfigs: Map<string, IConnectorEntity>): string => {
  let routePath: string = null;
  connectorConfigs.forEach((connectorConfig, currentSection) => {
    if (currentSection === section) {
      routePath = calc(connectorConfig.routeConfiguration.path);
    }
  });
  return routePath;
};
