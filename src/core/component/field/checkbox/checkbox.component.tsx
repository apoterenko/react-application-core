import * as React from 'react';

import { BaseCheckbox } from './base-checkbox.component';
import { ICheckboxState, ICheckboxProps } from './checkbox.interface';
import { joinClassName, orNull } from '../../../util';

export class Checkbox extends BaseCheckbox<ICheckboxProps, ICheckboxState> {

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return orNull(this.value, () => this.uiFactory.makeIcon('check-sign'));
  }

  /**
   * @stable [23.10.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-checkbox');
  }
}
