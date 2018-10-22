import { Component } from 'vue-property-decorator';

import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField, IVueFieldInputPropsEntity } from '../field/vue-index';

@ComponentName('vue-checkbox')
@Component
class VueCheckbox extends VueField {

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [21.10.2018]
   * @returns {IVueFieldInputPropsEntity}
   */
  protected data(): IVueFieldInputPropsEntity {
    return {
      ...super.data(),
      type$: 'checkbox',
    };
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-checkbox`;
  }
}
