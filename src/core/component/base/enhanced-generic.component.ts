import * as R from 'ramda';

import { isFn } from '../../util';
import { AnyT } from '../../definitions.interface';
import {
  GenericPluginCtorT,
  IEnhancedGenericComponentProps,
  IGenericPlugin,
} from '../../definition';
import { GenericComponent } from './generic.component';

export class EnhancedGenericComponent<TProps extends IEnhancedGenericComponentProps = IEnhancedGenericComponentProps,
  TState = {},
  TSelfRef = AnyT>
  extends GenericComponent<TProps, TState, TSelfRef> {

  protected readonly plugins: IGenericPlugin[] = [];

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
}
