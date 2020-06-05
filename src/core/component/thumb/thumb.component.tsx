import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
} from '../../util';
import { IThumbProps } from '../../definition';
import { GenericBaseComponent } from '../base/generic-base.component';

export class Thumb extends GenericBaseComponent<IThumbProps> {

  /**
   * @stable [05.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      disabled,
    } = this.mergedProps;
    const {
      value,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            CalcUtils.calc(className),
            'rac-thumb',
            disabled ? 'rac-thumb-disabled' : 'rac-thumb-enabled',
            value ? 'rac-thumb-checked' : 'rac-thumb-unchecked'
          )
        }/>
    );
  }

  /**
   * @stable [05.06.2020]
   * @returns {IChipProps}
   */
  protected get settingsProps(): IThumbProps {
    return this.componentsSettings.thumb;
  }
}
