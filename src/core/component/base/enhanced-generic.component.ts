import * as R from 'ramda';

import {
  isFn,
  isObjectEmpty,
  isObjectNotEmpty,
} from '../../util';
import { AnyT } from '../../definitions.interface';
import {
  GenericPluginCtorT,
  GenericPluginFactoryT,
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
  private $uiPlugins: Map<IGenericComponentCtor, GenericPluginFactoryT[]>;

  /**
   * @stable [21.04.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.initPlugins();
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
    if (isObjectEmpty(plugins)) {
      return;
    }
    const dynamicPluginsFactories = plugins.get(this.constructor as IGenericComponentCtor);
    if (isObjectNotEmpty(dynamicPluginsFactories)) {
      dynamicPluginsFactories.forEach((dynamicPluginFactory) => this.registerPlugin(dynamicPluginFactory(this)));
    }
    [].concat(this.props.plugins || []).forEach(this.registerPlugin, this);
  }

  /**
   * @stable [21.04.2020]
   * @returns {Map<IUniversalComponentCtor, GenericPluginFactoryT[]>}
   */
  private get uiPlugins(): Map<IGenericComponentCtor, GenericPluginFactoryT[]> {
    return this.$uiPlugins = this.$uiPlugins || getUiPlugins();
  }
}
