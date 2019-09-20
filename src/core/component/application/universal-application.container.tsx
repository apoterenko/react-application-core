import * as React from 'react';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { orNull, calc } from '../../util';
import {
  IConnectorConfigEntity,
  ContainerVisibilityTypeEnum,
  IRouteConfigEntity,
} from '../../configurations-definitions.interface';
import { IContainerClassEntity } from '../../entities-definitions.interface';
import { IUniversalContainerEntity } from '../../definition';
import { UniversalContainer } from '../base/universal.container';
import { APPLICATION_SECTION } from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';
import { IUniversalApplicationContainerProps } from './universal-application.interface';

export type RoutePredicateT = (routeConfiguration: IRouteConfigEntity) => boolean;

export abstract class UniversalApplicationContainer<TProps extends IUniversalApplicationContainerProps>
  extends UniversalContainer<TProps> {

  public static defaultProps: IUniversalApplicationContainerProps = {
    sectionName: APPLICATION_SECTION,
  };

  private static logger = LoggerFactory.makeLogger('UniversalApplicationContainer');
  private extraRoutes = new Map<IContainerClassEntity, IConnectorConfigEntity>();

  /**
   * @stable - 23.04.2018
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();

    UniversalApplicationContainer.logger.debug(
      '[$UniversalApplicationContainer][constructor] The app has been instantiated. The initial props are:',
      props
    );
  }

  /**
   * @stable [19.05.2018]
   */
  public componentDidMount(): void {
    this.dispatchCustomType(ApplicationActionBuilder.buildMountActionType());
  }

  /**
   * @stable - 23.04.2018
   * @param {RoutePredicateT} routePredicate
   * @returns {JSX.Element[]}
   */
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
      const routeConfiguration = calc(config.routeConfiguration, this.routes);
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

  protected registerRoute(container: IContainerClassEntity, config: IConnectorConfigEntity): void {
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
    UniversalApplicationContainer.logger.debug('[$UniversalApplicationContainer][onBeforeLogout] Send a logout action.');

    this.dispatchCustomType(ApplicationActionBuilder.buildLogoutActionType());
  }

  protected isMessageVisible(): boolean {
    const props = this.props;
    return props.progress || !!props.error || !props.ready;
  }

  protected getErrorMessage(): string {
    const props = this.props;
    return (
      orNull<string>(
        props.error || props.customError,
        () => (
          props.customError
            ? props.error
            : `${this.t(this.settings.messages.followingErrorHasOccurredMessage)} "${props.error.toLowerCase()}"`
        )
      )
    );
  }

  protected abstract buildRoute(ctor: IContainerClassEntity,
                                connectorConfiguration: IConnectorConfigEntity,
                                routeConfiguration: IRouteConfigEntity): JSX.Element;

  private buildRoutes(map: Map<IContainerClassEntity, IConnectorConfigEntity>,
                      routePredicate: RoutePredicateT): JSX.Element[] {
    const routes0: string[] = [];
    const routes: JSX.Element[] = [];

    map.forEach((connectorConfiguration, ctor) => {
      if (routePredicate.call(null, connectorConfiguration.routeConfiguration)) {
        const rConfiguration = calc(connectorConfiguration.routeConfiguration, this.routes);
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
