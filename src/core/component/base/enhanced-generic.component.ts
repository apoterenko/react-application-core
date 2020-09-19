import * as R from 'ramda';

import {
  ObjectUtils,
  TypeUtils,
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
   * @stable [19.09.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.initPlugins();
  }

  /**
   * @stable [19.09.2020]
   */
  public componentDidMount(): void {
    this.plugins.forEach((plugin) => TypeUtils.isFn(plugin.componentDidMount) && plugin.componentDidMount());
  }

  /**
   * @stable [21.04.2020]
   */
  public componentWillUnmount(): void {
    this.plugins.forEach((plugin) => TypeUtils.isFn(plugin.componentWillUnmount) && plugin.componentWillUnmount());
  }

  /**
   * @stable [19.09.2020]
   * @param prevProps
   * @param prevState
   * @param prevContext
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, prevContext?: never): void {
    this.plugins.forEach(
      (plugin) => TypeUtils.isFn(plugin.componentDidUpdate) && plugin.componentDidUpdate(prevProps, prevState, prevContext)
    );
  }

  /**
   * @stable [19.09.2020]
   * @param prevProps
   * @param prevState
   */
  public getSnapshotBeforeUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    this.plugins.forEach((plugin) =>
      TypeUtils.isFn(plugin.getSnapshotBeforeUpdate) && plugin.getSnapshotBeforeUpdate(prevProps, prevState));

    return null;
  }

  /**
   * @stable [19.09.2020]
   * @param pluginObject
   */
  protected registerPlugin(pluginObject: GenericPluginCtorT | IGenericPlugin): void {
    if (R.isNil(pluginObject)) {
      return;
    }
    this.plugins.push(
      TypeUtils.isFn(pluginObject)
        ? Reflect.construct(pluginObject as GenericPluginCtorT, [this])
        : pluginObject
    );
  }

  /**
   * @stable [21.04.2020]
   */
  private initPlugins(): void {
    const plugins = this.uiPlugins;

    if (!ObjectUtils.isObjectEmpty(plugins)) {
      const dynamicPluginsFactories = plugins.get(this.constructor as IGenericComponentCtor);
      if (ObjectUtils.isObjectNotEmpty(dynamicPluginsFactories)) {
        dynamicPluginsFactories.forEach((dynamicPluginFactory) => this.registerPlugin(dynamicPluginFactory(this)));
      }
    }

    [].concat(this.props.plugins || []).forEach(this.registerPlugin, this);
  }

  /**
   * @stable [19.09.2020]
   */
  private get uiPlugins(): GenericPluginsMapT {
    return this.$uiPlugins = this.$uiPlugins || getUiPlugins();
  }
}
