import * as React from 'react';
import { Store } from 'redux';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { DI_TYPES, staticInjector } from '../../di';
import { IKeyValue, AnyT, ACTION_PREFIX } from '../../definitions.interface';
import {
  INavigateEntity,
  IContainerClassEntity,
  IUniversalContainer,
  IOperationEntity,
  IUniversalApplicationStoreEntity,
} from '../../entities-definitions.interface';
import { IConnectorConfiguration, IRoutesConfiguration } from '../../configurations-definitions.interface';
import { IUniversalContainerProps } from '../../props-definitions.interface';
import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_REWRITE_ACTION_TYPE,
} from '../../router/router.interface';
import { IApplicationSettings } from '../../settings';
import { ApplicationTranslatorT } from '../../translation';
import { IDateConverter, INumberConverter } from '../../converter';
import { FormActionBuilder } from '../form/form-action.builder';
import { IAuthService } from '../../auth';
import { IUIFactory } from '../factory/factory.interface';
import { applySection, buildErrorMessage, isString, toType } from '../../util';
import { DictionariesActionBuilder } from '../../dictionary';

export class UniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends React.Component<TProps, TState>
  implements IUniversalContainer<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('UniversalContainer');

  // Because of Flux-architecture.
  // Needed for updating an array of dependent fields (each field depends on previous field state).
  // Each next field would be updated in one full cycle.
  private lifecycleTasks: Array<() => void> = [];

  /**
   * @stable - 12.04.2018
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.navigateToBack = this.navigateToBack.bind(this);
    this.dispatchFormClear = this.dispatchFormClear.bind(this);

    const originalRenderer = this.render;
    if (!R.isNil(originalRenderer)) {
      this.render = (): React.ReactNode => {
        try {
          return originalRenderer.call(this);
        } catch (e) {
          UniversalContainer.logger.error(`[$UniversalContainer][constructor] The error:`, e);
          return this.getErrorMessageElement(e);
        }
      };
    }
  }

  /**
   * @stable [02.07.2018]
   * @param {TProps} props
   * @param {Readonly<TState>} nextState
   * @returns {boolean}
   */
  public shouldComponentUpdate(props: TProps, nextState: Readonly<TState>) {
    return !R.equals(props, this.props)
      || (!R.isNil(this.state) && !R.equals(nextState, this.state));
  }

  /**
   * @stable [07.06.2018]
   * @param {Readonly<TProps extends IUniversalContainerProps>} prevProps
   * @param {Readonly<TState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    const task = this.lifecycleTasks.pop();
    if (task) {
      task();
    }
  }

  /**
   * @stable [18.11.2018]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void {
    const props = this.props;
    this.dispatchCustomType(`${props.sectionName}.${type}`, applySection(props.sectionName, data));
  }

  /**
   * Needed for the framework actions
   *
   * @stable [14.08.2018]
   * @param {string} type
   * @param {IKeyValue} data
   */
  public dispatchFrameworkAction<TData = IKeyValue>(type: string, data?: TData): void {
    const props = this.props;
    this.dispatchCustomType(`${ACTION_PREFIX}${props.sectionName}.${type}`, applySection(props.sectionName, data));
  }

  /**
   * @stable - 12.04.2018
   * @param {TPath0} path
   * @param {TState0} state
   */
  public navigate<TPath0, TState0>(path: TPath0, state?: TState0): void {
    this.doNavigate(ROUTER_NAVIGATE_ACTION_TYPE, path, state);
  }

  /**
   * @stable [14.01.2019]
   * @param {TPath0} path
   * @param {TState0} state
   */
  public navigateAndRewrite<TPath0, TState0>(path: TPath0, state?: TState0): void {
    this.doNavigate(ROUTER_REWRITE_ACTION_TYPE, path, state);
  }

  /**
   * @stable [18.11.2018]
   * @param {TChanges} changes
   */
  public dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangesSimpleAction(this.props.sectionName, changes)
    );
  }

  /**
   * @stable [18.11.2018]
   * @param {string} fieldName
   * @param {AnyT} fieldValue
   */
  public dispatchFormChange(fieldName: string, fieldValue?: AnyT): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangeSimpleAction(this.props.sectionName, fieldName, fieldValue)
    );
  }

  /**
   * @stable [18.11.2018]
   * @param {string} dictionary
   * @param {TData} data
   */
  public dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildLoadActionType(dictionary), applySection(dictionary, data));
  }

  /**
   * @stable [23.12.2018]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.appStore.dispatch({ type, data });
  }

  /**
   * @stable - 12.04.2018
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [27.12.2018]
   * @param {string | IOperationEntity} operation
   * @returns {boolean}
   */
  protected isTransportContainsExecutingOperation(operation: string | IOperationEntity): boolean {
    return this.props.transport.queue.includes(
      isString(operation)
        ? operation as string
        : (operation as IOperationEntity).id
    );
  }

  /**
   * @stable [26.08.2018]
   * @param {string} fieldName
   */
  protected dispatchFormClear(fieldName: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildClearSimpleAction(this.props.sectionName, fieldName)
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
   * @returns {Map<IContainerClassEntity, IConnectorConfiguration>}
   */
  protected get dynamicRoutes(): Map<IContainerClassEntity, IConnectorConfiguration> {
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

  /**
   * @stable [07.06.2018]
   * @param {() => void} task
   */
  protected registerLifecycleTask(task: () => void): void {
    this.lifecycleTasks.push(task);
  }

  /**
   * @stable [27.08.2018]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  protected getErrorMessageElement(e: Error): React.ReactNode {
    return buildErrorMessage(e.stack);
  }

  /**
   * @stable [14.01.2019]
   * @param {string} action
   * @param {TPath0} path
   * @param {TState0} state
   */
  private doNavigate<TPath0, TState0>(action: string, path: TPath0, state?: TState0): void {
    this.dispatchCustomType(action, toType<INavigateEntity<TPath0, TState0>>({ path, state }));
  }
}
