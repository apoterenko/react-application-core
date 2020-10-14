import * as React from 'react';

import { Field } from '../field/field.component';
import {
  IBaseCheckboxInputProps,
  IBaseCheckboxProps,
  IBaseCheckboxState,
} from './checkbox.interface';
import {
  CheckboxClassesEnum,
  IBaseEvent,
} from '../../../definition';
import {
  ClsUtils,
  noop,
  PropsUtils,
} from '../../../util';

export class BaseCheckbox<TProps extends IBaseCheckboxProps = IBaseCheckboxProps,
                          TState extends IBaseCheckboxState = IBaseCheckboxState>
  extends Field<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IBaseCheckboxProps>({}, Field);

  /**
   * @stable [31.08.2018]
   * @returns {IBaseCheckboxInputProps}
   */
  protected getInputElementProps(): IBaseCheckboxInputProps {
    return {
      ...super.getInputElementProps() as IBaseCheckboxInputProps,

      type: 'checkbox',

      /**
       * Needed for entity initialization
       * @stable [17.08.2018]
       */
      checked: this.displayValue,

      /**
       * Only the manual changes
       * @stable [17.08.2018]
       */
      onChange: noop,
    };
  }

  /**
   * @stable [23.10.2019]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    this.onChangeManually(!this.value);

    super.onClick(event);
  }

  /**
   * @stable [05.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      CheckboxClassesEnum.BASE_CHECKBOX,
      this.value ? CheckboxClassesEnum.BASE_CHECKBOX_CHECKED : CheckboxClassesEnum.BASE_CHECKBOX_UNCHECKED
    );
  }

  /**
   * @stable [19.06.2020]
   * @returns {string}
   */
  protected getLabel(): string {
    const {
      disableLabel,
    } = this.mergedProps;
    const originalLabel = super.getLabel();

    return this.value
      ? originalLabel
      : disableLabel || originalLabel;
  }
}
