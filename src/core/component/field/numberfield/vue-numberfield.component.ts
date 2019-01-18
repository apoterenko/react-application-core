import { Component } from 'vue-property-decorator';

import { AnyT } from '../../../definitions.interface';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseTextField } from '../textfield/vue-index';
import { VUE_NUMBER_FIELD_NAME } from './vue-numberfield.interface';

@ComponentName(VUE_NUMBER_FIELD_NAME)
@Component
export class VueNumberField extends VueBaseTextField {

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [19.01.2019]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-number-field`;
  }

  /**
   * @stable [19.01.2019]
   * @param {AnyT} newValue
   * @returns {AnyT}
   */
  protected toEmittedValue(newValue: AnyT): AnyT {
    return this.nc.number(newValue);
  }
}
