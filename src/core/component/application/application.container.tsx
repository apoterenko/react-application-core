import * as React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import {
  ContainerVisibilityTypesEnum,
  EventsEnum,
  IBaseRootContainerProps,
  IConnectorEntity,
  IGenericContainerCtor,
  IRouter,
  IRouterWrapperEntity,
  IStoreEntity,
  IUiMessageConfigEntity,
} from '../../definition';
import {
  PrivateRootContainer,
  PublicRootContainer,
} from '../root';
import { IApplicationContainerProps, } from './application.interface';
import { UniversalApplicationContainer } from './universal-application.container';
import {
  calc,
  ifNotEmptyThanValue,
} from '../../util';

export class ApplicationContainer<TStoreEntity extends IStoreEntity = IStoreEntity>
    extends UniversalApplicationContainer<IApplicationContainerProps> {

  private readonly routerRef = React.createRef<IRouterWrapperEntity>();

  /**
   * @stable [24.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <BrowserRouter
        ref={this.routerRef}
        basename={this.props.basename || this.environment.basePath}>
        <Switch>
          {this.getRoutes()}
        </Switch>
      </BrowserRouter>
    );
  }

  /**
   * @stable [24.09.2019]
   */
  public componentDidMount(): void {
    bindToConstantValue(DI_TYPES.Router, this.dynamicRouter);
    super.componentDidMount();

    if (this.storageSettings.appStateSyncEnabled) {
      // No need unsubscribe because "unload event"d
      this.eventManager.subscribe(this.environment.window, EventsEnum.UNLOAD, this.syncAppState);
    }
  }

  /**
   * @stable [16.11.2019]
   * @param {IGenericContainerCtor} ctor
   * @param {IConnectorEntity} connectorEntity
   * @returns {JSX.Element}
   */
  protected buildRoute(ctor: IGenericContainerCtor,
                       connectorEntity: IConnectorEntity): JSX.Element {
    const routeEntity = connectorEntity.routeConfiguration;
    const Component = routeEntity.type === ContainerVisibilityTypesEnum.PRIVATE
      ? PrivateRootContainer
      : PublicRootContainer;
    const props: IBaseRootContainerProps = {
      ...routeEntity,
      ...ifNotEmptyThanValue(routeEntity.path, () => ({path: calc(routeEntity.path)})),
    };
    return (
      <Component
        exact={true}
        accessConfiguration={connectorEntity.accessConfiguration}
        container={ctor}
        {...props}
        key={this.toRouteId(routeEntity)}/>
    );
  }

  /**
   * @stable [28.11.2019]
   * @returns {React.ReactNode}
   */
  protected getMessageElement(): React.ReactNode {
    return (
      <React.Fragment>
        {super.getMessageElement()}
      </React.Fragment>
    );
  }

  /**
   * @stable [28.11.2019]
   * @param {IUiMessageConfigEntity} message
   * @returns {IUiMessageConfigEntity}
   */
  protected prepareMessage(message: IUiMessageConfigEntity): IUiMessageConfigEntity {
    return {
      ...message,
      wrapperClassName: 'rac-application-message',
    };
  }

  /**
   * @stable [24.09.2019]
   * @returns {IRouter}
   */
  private get dynamicRouter(): IRouter {
    // We cannot to get access to history instance other way. This instance is private
    return this.routerRef.current.history;
  }
}
