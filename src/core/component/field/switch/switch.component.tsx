import * as React from 'react';

import { BaseCheckbox } from '../checkbox';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { Thumb } from '../../thumb';
import {
  ISwitchProps,
  SwitchClassesEnum,
} from '../../../definition';

/**
 * @component-impl
 * @stable [26.10.2020]
 */
export class Switch extends BaseCheckbox<ISwitchProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ISwitchProps>({}, BaseCheckbox);

  /**
   * @stable [26.10.2020]
   * @protected
   */
  protected getInputElement(): JSX.Element {
    const {
      thumbClassName,
    } = this.originalProps;

    return (
      <React.Fragment>
        <Thumb
          className={
            ClsUtils.joinClassName(
              SwitchClassesEnum.THUMB,
              CalcUtils.calc(thumbClassName)
            )
          }
          disabled={this.isDisabled}
          value={this.value}
        />
        {super.getInputElement()}
      </React.Fragment>
    );
  }

  /**
   * @stable [26.10.2020]
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), SwitchClassesEnum.SWITCH);
  }
}
