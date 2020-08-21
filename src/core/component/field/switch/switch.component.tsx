import * as React from 'react';

import { BaseCheckbox } from '../checkbox';
import {
  ISwitchProps,
} from './switch.interface';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { Thumb } from '../../thumb';
import { SwitchClassesEnum } from '../../../definition';

export class Switch extends BaseCheckbox<ISwitchProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ISwitchProps>({}, BaseCheckbox);

  /**
   * @stable [05.06.2020]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    const {
      thumbClassName,
    } = this.mergedProps;

    return (
      <React.Fragment>
        <Thumb
          className={ClsUtils.joinClassName(
            SwitchClassesEnum.SWITCH_THUMB,
            CalcUtils.calc(thumbClassName)
          )}
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
