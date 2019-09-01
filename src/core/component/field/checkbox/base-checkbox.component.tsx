import * as React from 'react';

import { Field } from '../../field';
import {
  IBaseCheckboxProps,
  IBaseCheckboxState,
  IBaseCheckboxInputProps,
} from './checkbox.interface';
import { IBaseEvent } from '../../../definition';
import { noop } from '../../../util';
import { FlexLayout } from '../../layout';

export class BaseCheckbox<TProps extends IBaseCheckboxProps = IBaseCheckboxProps,
                          TState extends IBaseCheckboxState = IBaseCheckboxState>
  extends Field<TProps,
                TState> {

  /**
   * @stable [17.12.2018]
   * @param {JSX.Element} body
   * @returns {JSX.Element}
   */
  protected getWrapperElement(body: JSX.Element): JSX.Element {
    const props = this.props;
    return (
      <div className={this.getFieldClassName()}>
        <FlexLayout
          row={true}
          alignItemsCenter={true}>
          {body}
        </FlexLayout>
        {this.getMessageElement()}
        {props.required && this.getErrorMessageElement()}
      </div>
    );
  }

  /**
   * @stable [31.08.2018]
   * @returns {IBaseCheckboxInputProps}
   */
  protected getInputElementProps(): IBaseCheckboxInputProps {
    return {
      ...super.getInputElementProps() as IBaseCheckboxInputProps,

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
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    const props = this.props;

    // A workaround to any framework implementation
    this.onChangeManually(!this.value);

    if (props.onClick) {
      props.onClick(event);
    }
  }
}
