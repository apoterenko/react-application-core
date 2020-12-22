import * as React from 'react';

import { BaseCheckbox } from './base-checkbox.component';
import {
  ClsUtils,
  ConditionUtils,
  PropsUtils,
} from '../../../util';
import {
  CheckboxClassesEnum,
  ICheckboxProps,
  IconsEnum,
} from '../../../definition';

/**
 * @component-impl
 * @stable [21.12.2020]
 */
export class Checkbox extends BaseCheckbox<ICheckboxProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ICheckboxProps>({}, BaseCheckbox);

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected get inputAttachmentElement(): JSX.Element {
    return ConditionUtils.orNull(this.value, () => this.uiFactory.makeIcon(IconsEnum.CHECK));
  }

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), CheckboxClassesEnum.CHECKBOX);
  }
}
