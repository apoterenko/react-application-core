import {
  IRouteConfiguration,
  IRoutesConfiguration,
  IConnectorConfiguration,
} from '../../configurations-definitions.interface';
import { isFn } from '../../util';

/**
 * @stable [18.09.2018]
 * @param {string} section
 * @param {Map<string, IConnectorConfiguration>} appSections
 * @returns {string}
 */
export const findRoutePathBySection = (section: string, appSections: Map<string, IConnectorConfiguration>): string => {
  let routePath;
  appSections.forEach((connectorConfiguration, section0) => {
    const routeConfiguration = connectorConfiguration.routeConfiguration;
    const routeConfigurationAsObject = routeConfiguration as IRouteConfiguration;
    const routeConfigurationAsFunction = routeConfiguration as ((routes: IRoutesConfiguration) => IRouteConfiguration);

    if (!isFn(routeConfigurationAsFunction) && section0 === section) {
      routePath = routeConfigurationAsObject.path;
    }
  });
  return routePath;
};
