import { Component } from 'vue-property-decorator';

import { orNull } from '../../../util';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField, IVueFieldInputPropsEntity } from '../field/vue-index';

@ComponentName('vue-text-field')
@Component
class VueTextField extends VueField {

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
    return super.data();
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-text-field`;
  }

  protected getLabelElement(): string {
    return orNull<string>(
      this.label,
      () => `<label class="rac-field-label">${this.label}</label>`    // TODO translation
    );
  }
}
