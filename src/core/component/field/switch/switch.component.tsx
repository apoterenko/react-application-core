import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseCheckbox } from '../checkbox';
import { ISwitchProps, ISwitchState } from './switch.interface';

export class Switch extends BaseCheckbox<ISwitchProps, ISwitchState> {

  /**
   * @stable [26.05.2019]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return (
      <React.Fragment>
        <div className='rac-switch__thumb'/>
        {super.getInputElement()}
      </React.Fragment>
    );
  }

  /**
   * @stable [31.08.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-switch');
  }

  /**
   * @stable [26.05.2019]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    return toClassName(
      super.getSelfElementClassName(),
      'rac-flex',
      'rac-flex-align-items-center',
      this.value ? 'rac-switch__checked' : 'rac-switch__unchecked',
    );
  }
}
