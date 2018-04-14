import { History } from 'history';

import { isFn } from '../util';
import { IComponentClassEntity } from '../entities-definitions.interface';
import {
  RouteConfigurationT,
  IRoutesConfiguration,
  IRouteConfiguration,
  IDefaultConnectorConfiguration,
} from '../configurations-definitions.interface';

export interface IRouter extends History {
  basename?: string;
}

export const toRouteOptions = (routeComponentConfig: RouteConfigurationT,
                               routes: IRoutesConfiguration): IRouteConfiguration => {
  return isFn(routeComponentConfig)
      ? (routeComponentConfig as (routes: IRoutesConfiguration) => IRouteConfiguration)(routes)
      : routeComponentConfig as IRouteConfiguration;
};

export const DYNAMIC_ROUTES = new Map<IComponentClassEntity, IDefaultConnectorConfiguration>();
