import * as React from 'react';

import { toClassName } from '../../../util';
import { ICheckboxState, ICheckboxProps, ICheckboxInputProps } from './checkbox.interface';
import { BaseCheckbox } from './base-checkbox.component';

export class Checkbox extends BaseCheckbox<ICheckboxProps, ICheckboxState> {

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return this.getWrapperElement(
      <React.Fragment>
        <div ref='self'
             style={props.style}
             className={this.getSelfElementClassName()}>
          <div className={this.getInputElementWrapperClassName()}>
            {this.getInputElement()}
            {this.getInputAttachmentElement()}
          </div>
        </div>
        {this.getLabelElement()}
      </React.Fragment>
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
