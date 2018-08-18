import * as React from 'react';

import { IBasicEvent } from '../../../definitions.interface';
import { Field, IFieldInputProps } from '../../field';
import { noop, toClassName, uuid } from '../../../util';
import {
  ICheckboxInternalState,
  ICheckboxInternalProps,
} from './checkbox.interface';
import { CenterLayout } from '../../layout';

export class Checkbox extends Field<Checkbox,
                                    ICheckboxInternalProps,
                                    ICheckboxInternalState> {

  private inputId = uuid();

  public render(): JSX.Element {
    const props = this.props;

    return (
      <div className={this.getFieldClassName()}>
        <CenterLayout>
          <div ref='self'
               style={props.style}
               className={this.getSelfElementClassName()}>
            <div className={this.getInputElementWrapperClassName()}>
              {this.getInputElement()}
              {this.getInputAttachmentElement()}
            </div>
          </div>
          <label className='rac-field-label'
                 htmlFor={this.inputId}>
            {props.label ? this.t(props.label) : props.children}
          </label>
        </CenterLayout>
        {this.fieldMessage}
        {props.required && this.fieldErrorMessageElement}
      </div>
    );
  }

  /**
   * @inheritDoc
   */
  protected getSelfElementClassName(): string {
    return toClassName(this.uiFactory.checkbox, 'rac-checkbox-field');
  }

  /**
   * @inheritDoc
   */
  protected getInputAttachmentElement(): JSX.Element {
    return this.uiFactory.makeCheckboxAttachment();
  }

  protected getInputElementProps(): IFieldInputProps {
    return {
      ...super.getInputElementProps() as IFieldInputProps,

      id: this.inputId,
      type: 'checkbox',
      className: this.uiFactory.checkboxInput,

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
   * @stable [17.08.2018]
   * @param {IBasicEvent} event
   */
  protected onClick(event: IBasicEvent): void {
    // A workaround to any implementation
    this.onChangeManually(!this.props.value);

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-form-checkbox');
  }

  /**
   * @stable [17.08.2018]
   * @returns {boolean}
   */
  protected getEmptyValue(): boolean {
    return false;
  }
}
