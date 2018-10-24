import * as R from 'ramda';
import { Component } from 'vue-property-decorator';

import { orNull, orDefault } from '../../../util';
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
    return orDefault<string, string>(
      !R.isNil(this.label),
      () => `<label class="vue-field-label">${this.label}</label>`,    // TODO translation
      () => ''
    );
  }

  protected getFieldAttachmentElement(): string {
    return orDefault<string, string>(
      !R.isNil(this.icon),
      () => `<span class="vue-field-icon ${this.icon}"/>`,    // TODO translation
      () => ''
    );
  }
}
