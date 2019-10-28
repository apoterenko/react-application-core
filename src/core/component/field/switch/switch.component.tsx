import * as React from 'react';

import { BaseCheckbox } from '../checkbox';
import { ISwitchProps, ISwitchState } from './switch.interface';
import { joinClassName } from '../../../util';
import { Thumb } from '../../thumb';

export class Switch extends BaseCheckbox<ISwitchProps, ISwitchState> {

  /**
   * @stable [26.05.2019]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return (
      <React.Fragment>
        <Thumb
          className='rac-switch__thumb'
          disabled={this.isDisabled}
          value={this.value}/>
        {super.getInputElement()}
      </React.Fragment>
    );
  }

  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-switch');
  }

  /**
   * @stable [26.05.2019]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    return joinClassName(
      super.getSelfElementClassName(),
      'rac-flex',
      'rac-flex-align-items-center'
    );
  }

  /**
   * @stable [31.05.2019]
   * @returns {string}
   */
  protected getInputWrapperElementClassName(): string {
    return joinClassName(
      super.getInputWrapperElementClassName(),
      'rac-flex-align-items-center'
    );
  }
}
