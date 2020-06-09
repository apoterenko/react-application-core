import * as React from 'react';

import { BaseCheckbox } from './base-checkbox.component';
import { ICheckboxProps } from './checkbox.interface';
import {
  ClsUtils,
  ConditionUtils,
} from '../../../util';
import {
  CheckboxClassesEnum,
  IconsEnum,
} from '../../../definition';

export class Checkbox extends BaseCheckbox<ICheckboxProps> {

  /**
   * @stable [09.06.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return ConditionUtils.orNull(this.value, () => this.uiFactory.makeIcon(IconsEnum.CHECK));
  }

  /**
   * @stable [09.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), CheckboxClassesEnum.CHECKBOX);
  }
}
