import * as R from 'ramda';
import { Component } from 'vue-property-decorator';

import { orEmpty } from '../../../util';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField } from '../field/vue-index';

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
   * @stable [26.10.2018]
   */
  public mounted() {
    super.mounted();
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-text-field`;
  }

  /**
   * @stable [26.10.2018]
   * @returns {string}
   */
  protected getLabelElement(): string {
    return orEmpty(
      !R.isNil(this.label),
      () => `<label class="vue-field-label">${this.t(this.label)}</label>`
    );
  }

  /**
   * @stable [26.10.2018]
   * @returns {string}
   */
  protected getFieldAttachmentElement(): string {
    return orEmpty(!R.isNil(this.icon), () => `<span class="vue-field-icon ${this.icon}"/>`);
  }
}
