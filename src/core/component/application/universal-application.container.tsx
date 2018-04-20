import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import {
  IDefaultConnectorConfiguration,
  ContainerVisibilityTypeEnum,
  IRouteConfiguration,
} from '../../configurations-definitions.interface';
import {
  IContainerClassEntity,
  IUniversalContainerEntity,
} from '../../entities-definitions.interface';
import { toRouteConfiguration } from '../../router/router.support';
import { UniversalBaseContainer } from '../../component/base/universal-base.container';
import { APPLICATION_SECTION } from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';

export type RoutePredicateT = (routeConfiguration: IRouteConfiguration) => boolean;

export abstract class UniversalApplicationContainer<TProps extends IUniversalContainerEntity>
  extends UniversalBaseContainer<TProps> {

  private static logger = LoggerFactory.makeLogger(UniversalApplicationContainer);
  private extraRoutes = new Map<IContainerClassEntity, IDefaultConnectorConfiguration>();

  constructor(props: TProps) {
    super(props, APPLICATION_SECTION);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();
  }

  protected getRoutes(routePredicate: RoutePredicateT = (routeConfiguration) => true): JSX.Element[] {
    return this.buildRoutes(this.dynamicRoutes, routePredicate)
      .concat(this.buildRoutes(this.extraRoutes, routePredicate));
  }

  protected lookupConnectedContainerByRoutePath(path: string): IContainerClassEntity {
    if (!path) {
      UniversalApplicationContainer.logger.warn(
        '[$UniversalApplicationContainer][lookupConnectedContainerByRoutePath] The path is empty.'
      );
      return null;
    }
    let result;
    this.dynamicRoutes.forEach((config, ctor) => {
      const routeConfiguration = toRouteConfiguration(config.routeConfiguration, this.routes);
      if (routeConfiguration && [routeConfiguration.path, routeConfiguration.key].includes(path)) {
        result = ctor;
      }
    });
    if (!result) {
      UniversalApplicationContainer.logger.warn(
        `[$UniversalApplicationContainer][lookupConnectedContainerByRoutePath] A component is not found by the path: ${path}.`
      );
    }
    return result;
  }

  protected registerRoute(container: IContainerClassEntity, config: IDefaultConnectorConfiguration): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    const loginContainer = this.lookupConnectedContainerByRoutePath(this.routes.signIn);
    if (!loginContainer) {
      UniversalApplicationContainer.logger.debug(
        '[$UniversalApplicationContainer][registerLogoutRoute] The login route is not registered.'
      );
    } else {
      this.registerRoute(
        loginContainer,
        {
          routeConfiguration: {
            type: ContainerVisibilityTypeEnum.PUBLIC,
            path: this.routes.logout,
            beforeEnter: this.onBeforeLogout,   // Web
            onEnter: this.onBeforeLogout,       // ReactNative
          },
        }
      );

      UniversalApplicationContainer.logger.debug(
        '[$UniversalApplicationContainer][registerLogoutRoute] Logout router has been registered.'
      );
    }
  }

  protected onBeforeLogout(): void {
    UniversalApplicationContainer.logger.debug(
      '[$UniversalApplicationContainer][onBeforeLogout] A user has clicked on a logout button.'
    );

    this.dispatchCustomType(ApplicationActionBuilder.buildLogoutActionType());
  }

  protected abstract buildRoute(ctor: IContainerClassEntity,
                                connectorConfiguration: IDefaultConnectorConfiguration,
                                routeConfiguration: IRouteConfiguration): JSX.Element;

  private buildRoutes(map: Map<IContainerClassEntity, IDefaultConnectorConfiguration>,
                      routePredicate: RoutePredicateT): JSX.Element[] {
    const routes0: string[] = [];
    const routes: JSX.Element[] = [];

    map.forEach((connectorConfiguration, ctor) => {
      if (routePredicate.call(null, connectorConfiguration.routeConfiguration)) {
        const rConfiguration = toRouteConfiguration(connectorConfiguration.routeConfiguration, this.routes);
        routes0.push(rConfiguration.path || rConfiguration.key);
        routes.push(
          this.buildRoute(
            ctor,
            connectorConfiguration,
            rConfiguration
          )
        );
      }
    });

    UniversalApplicationContainer.logger.debug(
      () => `[$UniversalApplicationContainer][buildRoutes] The routes have been built. Routes: ${routes0.join('\n')}`
    );
    return routes;
  }
}
