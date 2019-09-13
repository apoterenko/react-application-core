import * as React from 'react';
import * as R from 'ramda';
import { BrowserRouter, Switch } from 'react-router-dom';

import { clone, uuid, KeyPredicateT, cloneUsingFilters } from '../../util';
import { DI_TYPES, appContainer, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import { STORAGE_APP_STATE_KEY, IStorage } from '../../storage';
import { INITIAL_APPLICATION_NOTIFICATION_STATE } from '../../notification';
import { IRootContainerProps, PrivateRootContainer, PublicRootContainer } from '../root';
import { CONNECTOR_SECTION_FIELD } from '../connector';
import { ENV } from '../../env';
import { INITIAL_APPLICATION_TRANSPORT_STATE } from '../../transport';
import { IApplicationContainerProps, INITIAL_APPLICATION_STATE } from './application.interface';
import { Message } from '../message';
import {
  IConnectorConfigEntity,
  ContainerVisibilityTypeEnum,
  IRouteConfigEntity,
} from '../../configurations-definitions.interface';
import {
  IContainerClassEntity,
  IRouterComponentEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';
import { UniversalApplicationContainer } from './universal-application.container';
import { INITIAL_APPLICATION_CHANNEL_STATE } from '../../channel';

export class ApplicationContainer<TStoreEntity extends IApplicationStoreEntity = IApplicationStoreEntity>
    extends UniversalApplicationContainer<IApplicationContainerProps> {

  @lazyInject(DI_TYPES.Storage) private storage: IStorage;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  constructor(props: IApplicationContainerProps) {
    super(props);
    this.onUnload = this.onUnload.bind(this);
  }

  public render(): JSX.Element {
    return (
      <BrowserRouter
        ref='router'
        basename={this.props.basename || ENV.basePath}>
        <Switch>
          {...this.getRoutes()}
        </Switch>
      </BrowserRouter>
    );
  }

  /**
   * @stable [19.05.2018]
   */
  public componentDidMount(): void {
    this.eventManager.add(window, 'unload', this.onUnload);

    appContainer.bind<IRouterComponentEntity>(DI_TYPES.Router).toConstantValue(this.dynamicRouter);
    super.componentDidMount();
  }

  /**
   * @stable [23.06.2018]
   */
  public componentWillUnmount(): void {
    this.eventManager.remove(window, 'unload', this.onUnload);
  }

  protected onUnload(): void {
    if (this.settings.usePersistence) {
      this.saveState();
    }
  }

  protected clearStateBeforeSerialization(state: TStoreEntity, ...predicates: KeyPredicateT[]): TStoreEntity {
    this.clearSystemState(state);

    // You may clear the app state here before the serializing
    if (predicates.length) {
      return cloneUsingFilters(state, ...predicates);
    }
    return state;
  }

  /**
   * @stable [02.07.2018]
   * @param {TStoreEntity} state
   */
  protected clearSystemState(state: TStoreEntity): void {
    if (!R.isNil(state.notification)) {
      state.notification = INITIAL_APPLICATION_NOTIFICATION_STATE;
    }
    if (!R.isNil(state.transport)) {
      state.transport = INITIAL_APPLICATION_TRANSPORT_STATE;
    }
    if (!R.isNil(state.application)) {
      state.application = INITIAL_APPLICATION_STATE;
    }
    if (!R.isNil(state.channel)) {
      state.channel = INITIAL_APPLICATION_CHANNEL_STATE;
    }
  }

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

  protected clearPreviousStates(): void {
    this.storage.each((o, key) => {
      if (key.endsWith(STORAGE_APP_STATE_KEY)) {
        this.storage.remove(key, true);
      }
    });
  }

  protected buildRoute(ctor: IContainerClassEntity,
                       connectorConfiguration: IConnectorConfigEntity,
                       cfg: IRouteConfigEntity): JSX.Element {
    let Component;
    switch (cfg.type) {
      case ContainerVisibilityTypeEnum.PRIVATE:
        Component = PrivateRootContainer;
        break;
      default:
        Component = PublicRootContainer;
        break;
    }
    const props: IRootContainerProps = {
      exact: true,
      accessConfiguration: connectorConfiguration.accessConfiguration,
      section: Reflect.get(ctor, CONNECTOR_SECTION_FIELD),
      ...cfg,
    };
    return (
      <Component key={cfg.path || cfg.key}
                 container={ctor}
                 {...props}/>
    );
  }

  /**
   * @stable [09.08.2019]
   */
  protected doSaveState(): void {
    this.storage.set(
      STORAGE_APP_STATE_KEY,
      this.clearStateBeforeSerialization(clone<TStoreEntity>(this.appStore.getState() as TStoreEntity))
    );
  }

  private saveState(): void {
    this.clearPreviousStates();
    this.doSaveState();
  }

  private get dynamicRouter(): IRouterComponentEntity {
    // We cannot to get access to history instance other way. This instance is private
    return Reflect.get(this.refs.router, 'history');
  }
}
