import * as React from 'react';

import { toClassName } from '../../../util';
import { CenterLayout } from '../../layout';
import { BaseCheckbox } from '../checkbox';
import { ISwitchProps, ISwitchState, ISwitchInputProps } from './switch.interface';

export class Switch extends BaseCheckbox<Switch, ISwitchProps, ISwitchState> {

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
               className={this.getSelfElementClassName()}>
            {this.getAttachmentElement()}
            <div className={this.uiFactory.switchInputWrapper}>
              <div className={this.uiFactory.switchInputWrapperBody}>
                {this.getInputElement()}
              </div>
            </div>
          </div>
          {this.getLabelElement()}
        </CenterLayout>
        {this.getMessageElement()}
        {props.required && this.getErrorMessageElement()}
      </div>
    );
  }

  /**
   * @stable [31.08.2018]
   * @returns {ISwitchInputProps}
   */
  protected getInputElementProps(): ISwitchInputProps {
    return {
      ...super.getInputElementProps(),
      className: this.uiFactory.switchInput,
    };
  }

  /**
   * @stable [31.08.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-switch');
  }

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  protected getSelfElementClassName(): string {
    return toClassName(this.uiFactory.switch, 'rac-switch-field');
  }

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  private getAttachmentElement(): JSX.Element {
    return this.uiFactory.makeSwitchAttachment();
  }
}