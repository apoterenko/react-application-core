import { Component } from 'vue-property-decorator';

import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseTextField } from './vue-base-textfield.component';
import { VUE_TEXT_FIELD_NAME } from './vue-textfield.interface';
import { IVueTextFieldProps } from './vue-textfield.interface';

@ComponentName(VUE_TEXT_FIELD_NAME)
@Component
export class VueTextField extends VueBaseTextField implements IVueTextFieldProps {

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }
}
