import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import { orEmpty } from '../../../util';
import { VueField } from '../field/vue-index';
import {
  IVueBaseTextFieldProps,
  IVueBaseTextFieldTemplateMethods,
} from './vue-textfield.interface';

export class VueBaseTextField extends VueField implements IVueBaseTextFieldProps {
  @Prop({default: (): boolean => true}) protected floatLabel: boolean;
  @Prop({default: (): string => 'text'}) protected type: string;

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
   * @stable [22.12.2018]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueBaseTextFieldTemplateMethods>(): TMethods {
    return {
      ...super.getTemplateMethods(),
      onIconClick: this.onIconClick,
    } as TMethods;
  }

  /**
   * @stable [22.12.2018]
   * @returns {string}
   */
  protected getFieldAttachmentTemplate(): string {
    return orEmpty(
      !R.isNil(this.icon),
      () => (
        `<span class="vue-field-icon ${this.icon}"
               @click="onIconClick"/>`
      )
    );
  }

  /**
   * @stable [21.12.2018]
   */
  protected onIconClick(): void {
    // Do nothing
  }
}
