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
import {
  APPLICATION_LOGOUT_ACTION_TYPE,
  APPLICATION_SECTION,
} from './application.interface';

export abstract class UniversalApplicationContainer<TProps extends IUniversalContainerEntity>
  extends UniversalBaseContainer<TProps> {

  private static logger = LoggerFactory.makeLogger(UniversalApplicationContainer);
  private extraRoutes = new Map<IContainerClassEntity, IDefaultConnectorConfiguration>();

  constructor(props: TProps) {
    super(props, APPLICATION_SECTION);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();
  }

  protected getRoutes(): JSX.Element[] {
    return this.buildAllRoutes();
  }

  protected buildAllRoutes(): JSX.Element[] {
    return this.buildRoutes(this.dynamicRoutes).concat(this.buildRoutes(this.extraRoutes));
  }

  protected lookupConnectedContainerByRoutePath(path: string): IContainerClassEntity {
    let result;
    this.dynamicRoutes.forEach((config, ctor) => {
      const routeConfiguration = toRouteConfiguration(config.routeConfiguration, this.routes);
      if (routeConfiguration && (routeConfiguration.path === path || routeConfiguration.key === path)) {
        result = ctor;
      }
    });
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
            beforeEnter: this.onBeforeLogout,
          },
        }
      );
    }
  }

  protected onBeforeLogout(): void {
    this.dispatch(APPLICATION_LOGOUT_ACTION_TYPE);
  }

  protected abstract buildRoute(ctor: IContainerClassEntity,
                                connectorConfiguration: IDefaultConnectorConfiguration,
                                routeConfiguration: IRouteConfiguration): JSX.Element;

  private buildRoutes(map: Map<IContainerClassEntity, IDefaultConnectorConfiguration>): JSX.Element[] {
    const routes0: string[] = [];
    const routes: JSX.Element[] = [];
    map.forEach((connectorConfiguration, ctor) => {
      const rConfiguration = toRouteConfiguration(connectorConfiguration.routeConfiguration, this.routes);
      routes0.push(rConfiguration.path || rConfiguration.key);
      routes.push(
        this.buildRoute(
          ctor,
          connectorConfiguration,
          rConfiguration
        )
      );
    });

    UniversalApplicationContainer.logger.debug(
      () => `[$UniversalApplicationContainer][buildRoutes] The routes have been built. Size: ${routes0.join('\n')}`
    );
    return routes;
  }
}
