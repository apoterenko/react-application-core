import * as React from 'react';
import { Store } from 'redux';

import {
  DI_TYPES,
  getAuth,
  getDateConverter,
  getDynamicRoutes,
  getEnvironment,
  getEventManager,
  getLogManager,
  getNumberConverter,
  getPermissionsManager,
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
  DynamicRoutesMapT,
  IAuth,
  IEnvironment,
  IEventManager,
  ILogManager,
  INavigateEntity,
  IOperationEntity,
  IPermissionsManager,
  IRoutesEntity,
  IStateSerializer,
  IStorage,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_NAVIGATE_ACTION_TYPE,
  ROUTER_REWRITE_ACTION_TYPE,
} from '../../definition';
import {
  applySection,
  isString,
  toActionPrefix,
  toType,
} from '../../util';
import { DictionariesActionBuilder } from '../../dictionary';
import { FormActionBuilder } from '../form/form-action.builder';
import {
  IDateConverter,
  INumberConverter,
} from '../../converter';
import { ISettingsEntity } from '../../settings';
import { IUIFactory } from '../factory/factory.interface';
import { TranslatorT } from '../../translation';

export class UniversalContainer<TProps extends IUniversalContainerProps = IUniversalContainerProps,
                                TState = {},
                                TAccessConfig = {}>
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
   * @stable [27.10.2019]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.appStore.dispatch({type, data});
  }

  /**
   * @stable [27.10.2019]
   * @param {string} type
   * @param {TData} data
   * @param {string} otherSectionName
   */
  public dispatch<TData = IKeyValue>(type: string, data?: TData, otherSectionName?: string): void {
    const {sectionName} = this.props;
    const finalSectionName = otherSectionName || sectionName;
    this.dispatchCustomType(`${finalSectionName}.${type}`, applySection(finalSectionName, data));
  }

  /**
   * @deprecated Use proxy
   */
  public dispatchFrameworkAction<TData = IKeyValue>(type: string, data?: TData, otherSection?: string): void {
    const props = this.props;
    const section = otherSection || props.sectionName;
    this.dispatchCustomType(`${toActionPrefix(section)}.${type}`, applySection(section, data));
  }

  /**
   * @deprecated Use proxy
   */
  public navigate<TPath0, TState0>(path: TPath0, state?: TState0): void {
    this.doNavigate(ROUTER_NAVIGATE_ACTION_TYPE, path, state);
  }

  /**
   * @deprecated Use proxy
   */
  public navigateAndRewrite<TPath0, TState0>(path: TPath0, state?: TState0): void {
    this.doNavigate(ROUTER_REWRITE_ACTION_TYPE, path, state);
  }

  /**
   * @deprecated Use proxy
   */
  public dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangesPlainAction(otherSection || this.props.sectionName, changes)
    );
  }

  /**
   * @deprecated Use proxy
   */
  public dispatchFormChange(fieldName: string, fieldValue?: AnyT, otherSection?: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangePlainAction(otherSection || this.props.sectionName, fieldName, fieldValue)
    );
  }

  /**
   * @deprecated Use proxy
   */
  public dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildLoadActionType(dictionary), applySection(dictionary, data));
  }

  /**
   * @deprecated Use proxy
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @deprecated Use TransportStoreProxy
   */
  protected isTransportOperationInProgress(operation: string | IOperationEntity): boolean {
    return this.props.transport.queue.includes(
      isString(operation)
        ? operation as string
        : (operation as IOperationEntity).id
    );
  }

  /**
   * @deprecated Use proxy
   */
  protected dispatchFormClear(fieldName: string): void {
    this.appStore.dispatch(
      FormActionBuilder.buildClearSimpleAction(this.props.sectionName, fieldName)
    );
  }

  /**
   * @stable [16.11.2019]
   * @param {TAccessConfig} checkedObject
   * @returns {boolean}
   */
  protected hasPermission(checkedObject: TAccessConfig): boolean {
    return this.permissionsManager.isAccessible(checkedObject);
  }

  /**
   * @stable - 15.04.2018
   * @returns {IRoutesEntity}
   */
  protected get routes(): IRoutesEntity {
    return staticInjector(DI_TYPES.Routes);
  }

  /**
   * @deprecated Use proxy
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
   * @returns {IPermissionsManager<TAccessConfig>}
   */
  protected get permissionsManager(): IPermissionsManager<TAccessConfig> {
    return getPermissionsManager<TAccessConfig>();
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

  /**
   * @react-native-compatible
   * @stable [16.11.2019]
   * @returns {IAuth}
   */
  protected get auth(): IAuth {
    return getAuth();
  }

  /**
   * @react-native-compatible
   * @stable [16.11.2019]
   * @returns {DynamicRoutesMapT}
   */
  protected get dynamicRoutes(): DynamicRoutesMapT {
    return getDynamicRoutes();
  }
}
