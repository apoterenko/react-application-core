import * as React from 'react';
import { Store } from 'redux';

import {
  DI_TYPES,
  getDateConverter,
  getEnvironment,
  getEventManager,
  getLogManager,
  getNumberConverter,
  getSettings,
  getStateSerializer,
  getStorage,
  getStore,
  getTranslator,
  getUiFactory,
  staticInjector,
} from '../../di';
import { IKeyValue, AnyT } from '../../definitions.interface';
import {
  INavigateEntity,
} from '../../entities-definitions.interface';
import {
  IContainerCtor,
  IEnvironment,
  IEventManager,
  ILogManager,
  IOperationEntity,
  IRoutesEntity,
  IStateSerializer,
  IStorage,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../definition';
import { IConnectorConfigEntity } from '../../configurations-definitions.interface';
import {
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_REWRITE_ACTION_TYPE,
} from '../../router/router.interface';
import { ISettingsEntity } from '../../settings';
import { TranslatorT } from '../../translation';
import { IDateConverter, INumberConverter } from '../../converter';
import { FormActionBuilder } from '../form/form-action.builder';
import { IAuthService } from '../../auth';
import { IUIFactory } from '../factory/factory.interface';
import { applySection, isString, toActionPrefix, toType } from '../../util';
import { DictionariesActionBuilder } from '../../dictionary';

export class UniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps, TState = {}>
  extends React.PureComponent<TProps, TState>
  implements IUniversalContainer<TProps, TState> {

  protected readonly selfRef = React.createRef<AnyT>();

  /**
   * @stable - 12.04.2018
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.navigateToBack = this.navigateToBack.bind(this);
    this.dispatchFormClear = this.dispatchFormClear.bind(this);
    this.dispatchLoadDictionary = this.dispatchLoadDictionary.bind(this);
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
   * @stable [24.02.2019]
   * @param {string} type
   * @param {TData} data
   * @param {string} otherSection
   */
  public dispatchFrameworkAction<TData = IKeyValue>(type: string, data?: TData, otherSection?: string): void {
    const props = this.props;
    const section = otherSection || props.sectionName;
    this.dispatchCustomType(`${toActionPrefix(section)}.${type}`, applySection(section, data));
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
   * @stable [24.02.2019]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangesSimpleAction(otherSection || this.props.sectionName, changes)
    );
  }

  /**
   * @stable [24.02.2019]
   * @param {string} fieldName
   * @param {AnyT} fieldValue
   * @param {string} otherSection
   */
  public dispatchFormChange(fieldName: string, fieldValue?: AnyT, otherSection?: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangeSimpleAction(otherSection || this.props.sectionName, fieldName, fieldValue)
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
   * @returns {Map<IContainerCtor, IConnectorConfigEntity>}
   */
  protected get dynamicRoutes(): Map<IContainerCtor, IConnectorConfigEntity> {
    return staticInjector(DI_TYPES.DynamicRoutes);
  }

  /**
   * @stable - 15.04.2018
   * @returns {IRoutesEntity}
   */
  protected get routes(): IRoutesEntity {
    return staticInjector(DI_TYPES.Routes);
  }

  /**
   * @stable [26.04.2018]
   * @returns {IAuthService}
   */
  protected get auth(): IAuthService {
    return staticInjector(DI_TYPES.Auth);
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

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {Store<IUniversalStoreEntity>}
   */
  protected get appStore(): Store<IUniversalStoreEntity> {
    return getStore();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return getTranslator();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return getDateConverter();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {ISettingsEntity}
   */
  protected get storage(): IStorage {
    return getStorage();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return getSettings();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return getNumberConverter();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IUIFactory}
   */
  protected get uiFactory(): IUIFactory {
    return getUiFactory();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {ILogManager}
   */
  protected get logManager(): ILogManager {
    return getLogManager();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IEnvironment}
   */
  protected get environment(): IEnvironment {
    return getEnvironment();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IEventManager}
   */
  protected get eventManager(): IEventManager {
    return getEventManager();
  }

  /**
   * @react-native-compatible
   * @stable [07.10.2019]
   * @returns {IStateSerializer}
   */
  protected get stateSerializer(): IStateSerializer {
    return getStateSerializer();
  }
}
