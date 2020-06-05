import * as React from 'react';

import { BaseCheckbox } from '../checkbox';
import { ISwitchProps, ISwitchState } from './switch.interface';
import {
  ClsUtils,
} from '../../../util';
import { Thumb } from '../../thumb';
import { SwitchClassesEnum } from '../../../definition';

export class Switch extends BaseCheckbox<ISwitchProps, ISwitchState> {

  /**
   * @stable [26.05.2019]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return (
      <React.Fragment>
        <Thumb
          className={SwitchClassesEnum.SWITCH_THUMB}
          disabled={this.isDisabled}
          value={this.value}
        />
        {super.getInputElement()}
      </React.Fragment>
    );
  }

  /**
   * @stable [05.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), SwitchClassesEnum.SWITCH);
  }
}
