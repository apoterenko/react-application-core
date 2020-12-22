import * as React from 'react';

import { Field } from '../field/field.component';
import {
  CheckboxClassesEnum,
  IBaseCheckboxInputProps,
  IBaseCheckboxProps,
  IBaseCheckboxState,
  IBaseEvent,
} from '../../../definition';
import {
  ClsUtils,
  FnUtils,
  PropsUtils,
} from '../../../util';

/**
 * @component-impl
 * @stable [21.12.2020]
 */
export class BaseCheckbox<TProps extends IBaseCheckboxProps = IBaseCheckboxProps,
                          TState extends IBaseCheckboxState = IBaseCheckboxState>
  extends Field<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IBaseCheckboxProps>({}, Field);

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected getInputElementProps(): IBaseCheckboxInputProps {
    return {
      ...super.getInputElementProps() as IBaseCheckboxInputProps,

      type: 'checkbox',

      /**
       * Needed for entity initialization
       * @stable [21.12.2020]
       */
      checked: this.displayValue,

      /**
       * Only the manual changes
       * @stable [21.12.2020]
       */
      onChange: FnUtils.noop,
    };
  }

  /**
   * @stable [21.12.2020]
   * @param event
   * @protected
   */
  protected onClick(event: IBaseEvent): void {
    this.onChangeManually(!this.value);

    super.onClick(event);
  }

  /**
   * @stable [21.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      CheckboxClassesEnum.BASE_CHECKBOX,
      this.value
        ? CheckboxClassesEnum.BASE_CHECKBOX_CHECKED
        : CheckboxClassesEnum.BASE_CHECKBOX_UNCHECKED
    );
  }

  /**
   * @stable [21.12.2020]
   * @protected
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
