import * as React from 'react';

import { BasicEventT } from '../../../definitions.interface';
import { Field, IFieldInputProps } from '../../field';
import { toClassName, uuid } from '../../../util';
import {
  ICheckboxInternalState,
  ICheckboxInternalProps,
} from './checkbox.interface';

export class Checkbox extends Field<Checkbox,
                                    ICheckboxInternalProps,
                                    ICheckboxInternalState> {

  private inputId = uuid();

  public render(): JSX.Element {
    const props = this.props;

    return (
      <div className={this.getFieldClassName()}>
        <div className='rac-flex-full rac-flex rac-flex-row rac-flex-center'>
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
        </div>
        {this.fieldMessage}
        {this.fieldErrorMessageElement}
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
      checked: this.displayValue,
      className: toClassName(this.uiFactory.checkboxInput, 'rac-field-input'),
    };
  }

  protected onClick(event: BasicEventT): void {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-form-checkbox');
  }

  protected getEmptyValue(): boolean {
    return false;
  }
}
