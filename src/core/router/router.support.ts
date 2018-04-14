import { isFn } from '../util';
import {
  RouteConfigurationT,
  IRoutesConfiguration,
  IRouteConfiguration,
} from '../configurations-definitions.interface';

/* @stable - 15.04.2018 */
export const toRouteConfigurations = (routeComponentConfig: RouteConfigurationT,
                                      routes: IRoutesConfiguration): IRouteConfiguration =>
  isFn(routeComponentConfig)
    ? (routeComponentConfig as (routes: IRoutesConfiguration) => IRouteConfiguration)(routes)
    : routeComponentConfig as IRouteConfiguration;
