import * as React from 'react';

import { toClassName } from '../../../util';
import { ICheckboxState, ICheckboxProps, ICheckboxInputProps } from './checkbox.interface';
import { CenterLayout } from '../../layout';
import { BaseCheckbox } from './base-checkbox.component';

export class Checkbox extends BaseCheckbox<Checkbox, ICheckboxProps, ICheckboxState> {

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
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
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    return this.uiFactory.makeCheckboxAttachment();
  }

  /**
   * @stable [31.08.2018]
   * @returns {ICheckboxInputProps}
   */
  protected getInputElementProps(): ICheckboxInputProps {
    return {
      ...super.getInputElementProps(),
      className: this.uiFactory.checkboxInput,
    };
  }

  /**
   * @stable [31.08.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-checkbox');
  }

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  protected getSelfElementClassName(): string {
    return toClassName(this.uiFactory.checkbox, 'rac-checkbox-field');
  }
}
