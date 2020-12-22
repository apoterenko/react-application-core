import * as React from 'react';

import {
  CheckboxClassesEnum,
  IconsEnum,
  IRadioProps,
} from '../../../definition';
import {
  ClsUtils,
  ConditionUtils,
  PropsUtils,
} from '../../../util';
import { BaseCheckbox } from './base-checkbox.component';

/**
 * @component-impl
 * @stable [21.12.2020]
 */
export class Radio extends BaseCheckbox<IRadioProps> {

  public static readonly defaultProps =
    PropsUtils.mergeWithParentDefaultProps<IRadioProps>({}, BaseCheckbox);

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected get inputAttachmentElement(): JSX.Element {
    return ConditionUtils.orNull(this.value, () => this.uiFactory.makeIcon(IconsEnum.CIRCLE));
  }

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), CheckboxClassesEnum.RADIO);
  }
}
