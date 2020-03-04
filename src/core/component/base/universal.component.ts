import * as React from 'react';
import * as R from 'ramda';

import {
  isFn,
  nvl,
  patchRenderMethod,
} from '../../util';
import {
  DI_TYPES,
  getAsyncLibManager,
  getDatabaseStorage,
  getDomAccessor,
  getEnvironment,
  getEventEmitter,
  getEventManager,
  getFieldConverter,
  getNumberConverter,
  getPhoneConverter,
  getPlaceApi,
  getSettings,
  getTranslator,
  getTransport,
  getUiFactory,
  getUiPlugins,
  staticInjector,
} from '../../di';
import { ISettingsEntity } from '../../settings';
import {
  IDateConverter,
  INumberConverter,
} from '../../converter';
import { AnyT } from '../../definitions.interface';
import { IUIFactory } from '../factory/factory.interface';
import {
  IAsyncLibManager,
  IDomAccessor,
  IEnvironment,
  IEventEmitter,
  IEventManager,
  IFieldConverter,
  IPhoneConverter,
  IPlaceApi,
  IRoutesEntity,
  IStorage,
  ITransport,
  IUniqueId,
  IUniversalComponent,
  IUniversalComponentCtor,
  IUniversalComponentEntity,
  IUniversalComponentProps,
  IUniversalPlugin,
  IUniversalPluginCtor,
  TranslatorT,
  UniversalPluginFactoryT,
} from '../../definition';

export class UniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {},
                                TSelfRef = AnyT>
  extends React.PureComponent<TProps, TState>
  implements IUniversalComponent<TProps, TState> {

  protected readonly plugins: IUniversalPlugin[] = [];
  protected readonly selfRef = React.createRef<TSelfRef>();
  private readonly defaultUiFactory: IUIFactory = { makeIcon: () => null }; // TODO Mke it frozen & static

  /**
   * @stable [02.12.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.registerPlugin = this.registerPlugin.bind(this);

    this.initPlugins();
    patchRenderMethod(this);
  }

  /**
   * @stable [22.09.2019]
   */
  public componentDidMount(): void {
    this.plugins.forEach((plugin) => isFn(plugin.componentDidMount) && plugin.componentDidMount());
  }

  /**
   * @stable [22.09.2019]
   */
  public componentWillUnmount(): void {
    this.plugins.forEach((plugin) => isFn(plugin.componentWillUnmount) && plugin.componentWillUnmount());
  }

  /**
   * @stable [23.10.2019]
   * @param {Readonly<TProps extends IUniversalComponentProps>} prevProps
   * @param {Readonly<TState>} prevState
   */
  public getSnapshotBeforeUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    this.plugins.forEach((plugin) =>
      isFn(plugin.getSnapshotBeforeUpdate) && plugin.getSnapshotBeforeUpdate(prevProps, prevState));
    return null;
  }

  /**
   * @stable [23.04.2018]
   * @param {Readonly<TProps>} prevProps
   * @param {Readonly<TState>} prevState
   * @param {never} prevContext
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, prevContext?: never): void {
    this.plugins.forEach(
      (plugin) => isFn(plugin.componentDidUpdate) && plugin.componentDidUpdate(prevProps, prevState, prevContext)
    );
  }

  /**
   * @stable [01.12.2018]
   * @returns {Element}
   */
  public getSelf(): Element {
    return this.selfRef.current || this.refs.self as any; // TODO any
  }

  /**
   * @react-native-compatible
   * @stable [08.10.2019]
   * @returns {IEnvironment}
   */
  protected get environment(): IEnvironment {
    return getEnvironment();
  }

  /**
   * @react-native-compatible
   * @stable [08.10.2019]
   * @returns {IEventManager}
   */
  protected get eventManager(): IEventManager {
    return getEventManager();
  }

  /**
   * @react-native-compatible
   * @stable [09.01.2020]
   * @returns {IFieldConverter}
   */
  protected get fieldConverter(): IFieldConverter {
    return getFieldConverter();
  }

  /**
   * @react-native-compatible
   * @stable [17.01.2020]
   * @returns {IEventEmitter}
   */
  protected get eventEmitter(): IEventEmitter {
    return getEventEmitter();
  }

  /**
   * @react-native-compatible
   * @stable [17.01.2020]
   * @returns {IUniqueId}
   */
  protected get uniqueId(): IUniqueId {
    return null; // getUniqueId();
  }

  /**
   * @react-native-compatible
   * @stable [09.01.2020]
   * @returns {IPlaceApi}
   */
  protected get placeApi(): IPlaceApi {
    return getPlaceApi();
  }

  /**
   * @react-native-compatible
   * @stable [09.01.2020]
   * @returns {IAsyncLibManager}
   */
  protected get asyncLibManager(): IAsyncLibManager {
    return getAsyncLibManager();
  }

  /**
   * @reactNativeCompatible
   * @stable [22.09.2018]
   * @returns {TranslatorT}
   */
  protected get t(): TranslatorT {
    return getTranslator();
  }

  /**
   * @reactNativeCompatible
   * @stable [29.07.2019]
   * @returns {ISettingsEntity}
   */
  protected get settings(): ISettingsEntity {
    return getSettings();
  }

  /**
   * @stable []
   * @returns {IRoutesEntity}
   */
  protected get routes(): IRoutesEntity {
    return staticInjector(DI_TYPES.Routes);
  }

  /**
   * @reactNativeCompatible
   * @stable [29.07.2019]
   * @returns {IStorage}
   */
  protected get databaseStorage(): IStorage {
    return getDatabaseStorage();
  }

  /**
   * @stable [13.05.2018]
   * @returns {IDateConverter}
   */
  protected get dc(): IDateConverter {
    return staticInjector(DI_TYPES.DateConverter);
  }

  /**
   * @reactNativeCompatible
   * @stable [22.09.2019]
   * @returns {INumberConverter}
   */
  protected get nc(): INumberConverter {
    return getNumberConverter();
  }

  /**
   * @react-native-compatible
   * @stable [04.03.2020]
   * @returns {IPhoneConverter}
   */
  protected get pc(): IPhoneConverter {
    return getPhoneConverter();
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUIFactory}
   */
  protected get uiFactory(): IUIFactory {
    return nvl(getUiFactory(), this.defaultUiFactory);
  }

  /**
   * @react-native-compatible
   * @stable [19.02.2020]
   * @returns {IDomAccessor}
   */
  protected get domAccessor(): IDomAccessor {
    return getDomAccessor();
  }

  /**
   * @reactNativeCompatible
   * @stable [15.09.2019]
   * @returns {ITransport}
   */
  protected get transport(): ITransport {
    return getTransport();
  }

  /**
   * @stable [18.06.2019]
   * @param {IUniversalPluginCtor | IUniversalPlugin} pluginObject
   */
  protected registerPlugin(pluginObject: IUniversalPluginCtor | IUniversalPlugin): void {
    if (R.isNil(pluginObject)) {
      return;
    }
    this.plugins.push(
      isFn(pluginObject)
        ? Reflect.construct(pluginObject as IUniversalPluginCtor, [this])
        : pluginObject
    );
  }

  /**
   * @stable [18.06.2019]
   */
  private initPlugins(): void {
    const plugins = this.uiPlugins;
    if (R.isNil(plugins)) {
      return;
    }
    const dynamicPluginFactory = plugins.get(this.constructor as IUniversalComponentCtor);
    if (dynamicPluginFactory) {
      this.registerPlugin(dynamicPluginFactory(this));
    }
    [].concat(this.props.plugins || []).forEach(this.registerPlugin);
  }

  /**
   * @reactNativeCompatible
   * @stable [21.08.2019]
   * @returns {Map<IUniversalComponentCtor, UniversalPluginFactoryT>}
   */
  private get uiPlugins(): Map<IUniversalComponentCtor, UniversalPluginFactoryT> {
    return getUiPlugins();
  }
}
