import * as R from 'ramda';

import {
  isFn,
  patchRenderMethod,
} from '../../util';
import {
  DI_TYPES,
  getAsyncLibManager,
  getDatabaseStorage,
  getEnvironment,
  getEventEmitter,
  getFieldConverter,
  getPlaceApi,
  getTransport,
  getUiPlugins,
  staticInjector,
} from '../../di';
import { AnyT } from '../../definitions.interface';
import {
  GenericPluginCtorT,
  GenericPluginFactoryT,
  IAsyncLibManager,
  IEnvironment,
  IEventEmitter,
  IFieldConverter,
  IGenericPlugin,
  IPlaceApi,
  IRoutesEntity,
  IStorage,
  ITransport,
  IUniqueId,
  IUniversalComponent,
  IUniversalComponentCtor,
  IUniversalComponentProps,
} from '../../definition';
import { GenericBaseComponent } from './generic-base.component';

/**
 * TODO
 * @deprecated
 */
export class UniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {},
                                TSelfRef = AnyT>
  extends GenericBaseComponent<TProps, TState, TSelfRef>
  implements IUniversalComponent<TProps, TState> {

  protected readonly plugins: IGenericPlugin[] = [];

  /**
   * @stable [02.12.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

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
   * @reactNativeCompatible
   * @stable [15.09.2019]
   * @returns {ITransport}
   */
  protected get transport(): ITransport {
    return getTransport();
  }

  /**
   * @stable [18.06.2019]
   * @param {GenericPluginCtorT | IGenericPlugin} pluginObject
   */
  protected registerPlugin(pluginObject: GenericPluginCtorT | IGenericPlugin): void {
    if (R.isNil(pluginObject)) {
      return;
    }
    this.plugins.push(
      isFn(pluginObject)
        ? Reflect.construct(pluginObject as GenericPluginCtorT, [this])
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
    [].concat(this.props.plugins || []).forEach(this.registerPlugin, this);
  }

  /**
   * @reactNativeCompatible
   * @stable [21.08.2019]
   * @returns {Map<IUniversalComponentCtor, GenericPluginFactoryT>}
   */
  private get uiPlugins(): Map<IUniversalComponentCtor, GenericPluginFactoryT> {
    return getUiPlugins();
  }
}
