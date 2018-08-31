import * as React from 'react';

import { Field } from '../../field';
import {
  IBaseCheckboxProps,
  IBaseCheckboxState,
  IBaseCheckboxInputProps,
} from './checkbox.interface';
import { IBasicEvent } from '../../../definitions.interface';
import { uuid, noop } from '../../../util';

export class BaseCheckbox<TComponent extends BaseCheckbox<TComponent, TProps, TState>,
                          TProps extends IBaseCheckboxProps = IBaseCheckboxProps,
                          TState extends IBaseCheckboxState = IBaseCheckboxState>
  extends Field<TComponent,
                TProps,
                TState> {

  protected inputId = uuid();

  /**
   * @stable [31.08.2018]
   * @returns {IBaseCheckboxInputProps}
   */
  protected getInputElementProps(): IBaseCheckboxInputProps {
    return {
      ...super.getInputElementProps() as IBaseCheckboxInputProps,

      id: this.inputId,
      type: 'checkbox',

      /**
       * Needed for entity initializing
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
   * @stable [31.08.2018]
   * @param {IBasicEvent} event
   */
  protected onClick(event: IBasicEvent): void {
    const props = this.props;

    // A workaround to any framework implementation
    this.onChangeManually(!props.value);

    if (props.onClick) {
      props.onClick(event);
    }
  }

  /**
   * @stable [31.08.2018]
   * @returns {boolean}
   */
  protected getEmptyValue(): boolean {
    return false;
  }
}
