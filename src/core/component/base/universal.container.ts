import { Component } from 'react';
import { Store } from 'redux';
import * as R from 'ramda';

import { DI_TYPES, staticInjector } from '../../di';
import {
  IKeyValue,
  AnyT,
} from '../../definitions.interface';
import {
  INavigateEntity,
  IContainerClassEntity,
  IUniversalContainer,
  IUniversalApplicationStoreEntity,
} from '../../entities-definitions.interface';
import {
  IDefaultConnectorConfiguration,
  IRoutesConfiguration,
} from '../../configurations-definitions.interface';
import { IUniversalContainerProps } from '../../props-definitions.interface';
import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
} from '../../router/router.interface';
import { IApplicationSettings } from '../../settings';
import { ApplicationTranslatorT } from '../../translation';
import { IDateConverter, INumberConverter } from '../../converter';
import { FormActionBuilder } from '../form/form-action.builder';
import { IAuthService } from '../../auth';
import { IUIFactory } from '../factory/factory.interface';

export class UniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends Component<TProps, TState>
  implements IUniversalContainer<TProps, TState> {

  /**
   * @stable - 12.04.2018
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.navigateToBack = this.navigateToBack.bind(this);
  }

  /**
   * @stable - 16.04.2018
   * @param {TProps} props
   * @param {Readonly<TState>} nextState
   * @param {AnyT} nextContext
   * @returns {boolean}
   */
  public shouldComponentUpdate(props: TProps, nextState: Readonly<TState>, nextContext: AnyT) {
    return !R.equals(props, this.props);
  }

  /**
   * @stable - 12.04.2018
   * @param {string} type
   * @param {IKeyValue} data
   */
  public dispatch(type: string, data?: IKeyValue): void {
    const props = this.props;
    this.dispatchCustomType(`${props.sectionName}.${type}`, { section: props.sectionName, ...data });
  }

  /**
   * @stable - 12.04.2018
   * @param {TPath0} path
   * @param {TState0} state
   */
  public navigate<TPath0, TState0>(path: TPath0, state?: TState0): void {
    const payload: INavigateEntity<TPath0, TState0> = { path, state };
    this.dispatchCustomType(ROUTER_NAVIGATE_ACTION_TYPE, payload);
  }

  /**
   * @stable - 12.04.2018
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * Service method (DRY)
   * @stable - 12.04.2018
   * @param {string} operationId
   * @returns {boolean}
   */
  protected isTransportContainsExecutingOperation(operationId: string): boolean {
    return this.props.transport.queue.includes(operationId);
  }

  /**
   * @stable - 12.04.2018
   * @param {string} type
   * @param {AnyT} data
   */
  protected dispatchCustomType(type: string, data?: AnyT): void {
    this.appStore.dispatch({ type, data });
  }

  /**
   * @stable - 25.04.2018
   * @param {string} fieldName
   * @param {AnyT} fieldValue
   */
  protected dispatchFormChange(fieldName: string, fieldValue?: AnyT): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangeSimpleAction(this.props.sectionName, fieldName, fieldValue)
    );
  }

  /**
   * @stable - 25.04.2018
   * @param {IKeyValue} changes
   */
  protected dispatchFormChanges(changes: IKeyValue): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangesSimpleAction(this.props.sectionName, changes)
    );
  }

  /**
   * @stable - 15.04.2018
   * @returns {Store<{}>}
   */
  protected get appStore(): Store<IUniversalApplicationStoreEntity> {
    return staticInjector(DI_TYPES.Store);
  }

  /**
   * @stable - 15.04.2018
   * @returns {Map<IContainerClassEntity, IDefaultConnectorConfiguration>}
   */
  protected get dynamicRoutes(): Map<IContainerClassEntity, IDefaultConnectorConfiguration> {
    return staticInjector(DI_TYPES.DynamicRoutes);
  }

  /**
   * @stable - 15.04.2018
   * @returns {IRoutesConfiguration}
   */
  protected get routes(): IRoutesConfiguration {
    return staticInjector(DI_TYPES.Routes);
  }

  /**
   * @stable - 15.04.2018
   * @returns {IApplicationSettings}
   */
  protected get settings(): IApplicationSettings {
    return staticInjector(DI_TYPES.Settings);
  }

  /**
   * @stable [26.04.2018]
   * @returns {IAuthService}
   */
  protected get auth(): IAuthService {
    return staticInjector(DI_TYPES.Auth);
  }

  /**
   * @stable - 15.04.2018
   * @returns {ApplicationTranslatorT}
   */
  protected get t(): ApplicationTranslatorT {
    return staticInjector(DI_TYPES.Translate);
  }

  /**
   * @stable - 16.04.2018
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return staticInjector(DI_TYPES.DateConverter);
  }

  /**
   * @stable - 16.04.2018
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return staticInjector(DI_TYPES.NumberConverter);
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUIFactory}
   */
  protected get uiFactory(): IUIFactory {
    return staticInjector(DI_TYPES.UIFactory);
  }
}
