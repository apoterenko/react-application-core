import * as R from 'ramda';

import {
  isFn,
  isObjectEmpty,
  isObjectNotEmpty,
} from '../../util';
import { AnyT } from '../../definitions.interface';
import {
  GenericPluginCtorT,
  GenericPluginsMapT,
  IEnhancedGenericComponentProps,
  IGenericComponentCtor,
  IGenericPlugin,
} from '../../definition';
import { GenericComponent } from './generic.component';
import { getUiPlugins } from '../../di';

export class EnhancedGenericComponent<TProps extends IEnhancedGenericComponentProps = IEnhancedGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends GenericComponent<TProps, TState, TSelfRef> {

  protected readonly plugins: IGenericPlugin[] = [];
  private $uiPlugins: GenericPluginsMapT;

  /**
   * @stable [21.04.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.initPlugins();
  }

  /**
   * @stable [21.04.2020]
   */
  public componentDidMount(): void {
    this.plugins.forEach((plugin) => isFn(plugin.componentDidMount) && plugin.componentDidMount());
  }

  /**
   * @stable [21.04.2020]
   */
  public componentWillUnmount(): void {
    this.plugins.forEach((plugin) => isFn(plugin.componentWillUnmount) && plugin.componentWillUnmount());
  }

  /**
   * @stable [21.04.2020]
   * @param {Readonly<TProps extends IEnhancedGenericComponentProps>} prevProps
   * @param {Readonly<TState>} prevState
   * @param {never} prevContext
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, prevContext?: never): void {
    this.plugins.forEach(
      (plugin) => isFn(plugin.componentDidUpdate) && plugin.componentDidUpdate(prevProps, prevState, prevContext)
    );
  }

  /**
   * @stable [21.04.2020]
   * @param {Readonly<TProps extends IEnhancedGenericComponentProps>} prevProps
   * @param {Readonly<TState>} prevState
   */
  public getSnapshotBeforeUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    this.plugins.forEach((plugin) =>
      isFn(plugin.getSnapshotBeforeUpdate) && plugin.getSnapshotBeforeUpdate(prevProps, prevState));

    return null;
  }

  /**
   * @stable [10.04.2020]
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
   * @stable [21.04.2020]
   */
  private initPlugins(): void {
    const plugins = this.uiPlugins;

    if (!isObjectEmpty(plugins)) {
      const dynamicPluginsFactories = plugins.get(this.constructor as IGenericComponentCtor);
      if (isObjectNotEmpty(dynamicPluginsFactories)) {
        dynamicPluginsFactories.forEach((dynamicPluginFactory) => this.registerPlugin(dynamicPluginFactory(this)));
      }
    }

    [].concat(this.props.plugins || []).forEach(this.registerPlugin, this);
  }

  /**
   * @stable [21.04.2020]
   * @returns {GenericPluginsMapT}
   */
  private get uiPlugins(): GenericPluginsMapT {
    return this.$uiPlugins = this.$uiPlugins || getUiPlugins();
  }
}
