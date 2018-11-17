import * as R from 'ramda';

import { orEmpty } from '../../../util';
import { VueField } from '../field/vue-index';

export class VueBaseTextField extends VueField {

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-text-field`;
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  protected getInputClassName(): string {
    return `${super.getInputClassName()} rac-flex-full`;
  }

  /**
   * @stable [26.10.2018]
   * @returns {string}
   */
  protected getFieldAttachmentElement(): string {
    return orEmpty(!R.isNil(this.icon), () => `<span class="vue-field-icon ${this.icon}"/>`);
  }
}
