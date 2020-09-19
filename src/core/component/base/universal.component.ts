import * as R from 'ramda';

import {
  isFn,
  isObjectNotEmpty,
} from '../../util';
import {
  DI_TYPES,
  getUiPlugins,
  staticInjector,
} from '../../di';
import { AnyT } from '../../definitions.interface';
import {
  GenericPluginCtorT,
  GenericPluginFactoryT,
  IGenericPlugin,
  IRoutesEntity,
  IUniqueId,
  IUniversalComponent,
  IUniversalComponentCtor,
  IUniversalComponentProps,
} from '../../definition';
import { GenericComponent } from './generic.component';

/**
 * TODO
 * @deprecated
 */
export class UniversalComponent<TProps extends IUniversalComponentProps = IUniversalComponentProps,
                                TState = {},
                                TSelfRef = AnyT>
  extends GenericComponent<TProps, TState, TSelfRef>
  implements IUniversalComponent<TProps, TState> {

  protected readonly plugins: IGenericPlugin[] = [];

  /**
   * @stable [02.12.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.initPlugins();
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
   * @stable [17.01.2020]
   * @returns {IUniqueId}
   */
  protected get uniqueId(): IUniqueId {
    return null; // getUniqueId();
  }

  /**
   * @stable []
   * @returns {IRoutesEntity}
   */
  protected get routes(): IRoutesEntity {
    return staticInjector(DI_TYPES.Routes);
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
    const dynamicPluginsFactories = plugins.get(this.constructor as IUniversalComponentCtor);
    if (isObjectNotEmpty(dynamicPluginsFactories)) {
      dynamicPluginsFactories.forEach((dynamicPluginFactory) => this.registerPlugin(dynamicPluginFactory(this)));
    }
    [].concat(this.props.plugins || []).forEach(this.registerPlugin, this);
  }

  private get uiPlugins(): Map<IUniversalComponentCtor, GenericPluginFactoryT[]> {
    return getUiPlugins();
  }
}
