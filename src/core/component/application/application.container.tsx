import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import {
  isFn,
  uuid,
} from '../../util';
import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import {
  ContainerVisibilityTypesEnum,
  EventsEnum,
  IConnectorEntity,
  IContainerCtor,
  IRouteEntity,
  IRouter,
  IRouterWrapperEntity,
  IStoreEntity,
} from '../../definition';
import {
  PrivateRootContainer,
  PublicRootContainer,
} from '../root';
import { IApplicationContainerProps, } from './application.interface';
import { Message } from '../message';
import { UniversalApplicationContainer } from './universal-application.container';

export class ApplicationContainer<TStoreEntity extends IStoreEntity = IStoreEntity>
    extends UniversalApplicationContainer<IApplicationContainerProps> {

  private readonly routerRef = React.createRef<IRouterWrapperEntity>();
  private syncStageOnUnloadUnsubscriber: () => void;

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
          {...this.getRoutes()}
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
  }

  // TODO refactoring
  protected getRoutes(): JSX.Element[] {
    const props = this.props;
    return this.isMessageVisible()
      ? [
        <Message key={uuid()}
                 className='rac-application-message'
                 error={props.error}
                 progress={props.progress}
                 errorMessage={this.getErrorMessage()}
                 emptyMessage={this.settings.messages.appNotReadyMessage}
        />
      ]
      : super.getRoutes();
  }

  /**
   * @stable [16.11.2019]
   * @param {IContainerCtor} ctor
   * @param {IConnectorEntity} connectorEntity
   * @returns {JSX.Element}
   */
  protected buildRoute(ctor: IContainerCtor,
                       connectorEntity: IConnectorEntity): JSX.Element {
    const routeEntity = connectorEntity.routeConfiguration;
    const Component = routeEntity.type === ContainerVisibilityTypesEnum.PRIVATE
      ? PrivateRootContainer
      : PublicRootContainer;
    return (
      <Component
        exact={true}
        accessConfiguration={connectorEntity.accessConfiguration}
        container={ctor}
        {...routeEntity}
        key={this.toRouteId(routeEntity)}/>
    );
  }

  /**
   * @stable [24.09.2019]
   * @returns {boolean}
   */
  protected registerSyncStateWithStorageTask(): boolean {
    const result = super.registerSyncStateWithStorageTask();
    if (result) {
      this.syncStageOnUnloadUnsubscriber =
        this.eventManager.subscribe(this.environment.window, EventsEnum.UNLOAD, this.syncState);
    }
    return result;
  }

  /**
   * @stable [24.09.2019]
   * @returns {boolean}
   */
  protected unregisterSyncStateWithStorageTask(): boolean {
    const result = super.unregisterSyncStateWithStorageTask();
    if (result && isFn(this.syncStageOnUnloadUnsubscriber)) {
      this.syncStageOnUnloadUnsubscriber();
    }
    return result;
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
