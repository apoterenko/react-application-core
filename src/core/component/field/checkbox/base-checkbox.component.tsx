import * as React from 'react';

import { Field } from '../../field';
import {
  IBaseCheckboxInputProps,
  IBaseCheckboxProps,
  IBaseCheckboxState,
} from './checkbox.interface';
import { IBaseEvent } from '../../../definition';
import {
  joinClassName,
  noop,
  nvl,
} from '../../../util';

export class BaseCheckbox<TProps extends IBaseCheckboxProps = IBaseCheckboxProps,
                          TState extends IBaseCheckboxState = IBaseCheckboxState>
  extends Field<TProps, TState> {

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
   * @stable [24.10.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(
      super.getFieldClassName(),
      'rac-base-checkbox',
      this.value ? 'rac-checked' : 'rac-unchecked'
    );
  }

  /**
   * @stable [16.01.2020]
   * @returns {string}
   */
  protected getLabel(): string {
    return this.value
      ? super.getLabel()
      : nvl(this.props.disableLabel, super.getLabel());
  }
}
