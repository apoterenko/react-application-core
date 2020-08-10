import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
} from '../../util';
import {
  IThumbProps,
  ThumbClassesEnum,
} from '../../definition';
import { GenericBaseComponent } from '../base/generic-base.component';

export class Thumb extends GenericBaseComponent<IThumbProps> {

  /**
   * @stable [05.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
    } = this.mergedProps;
    const {
      disabled,
      value,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            CalcUtils.calc(className),
            ThumbClassesEnum.THUMB,
            disabled ? ThumbClassesEnum.THUMB_DISABLED : ThumbClassesEnum.THUMB_ENABLED,
            value ? ThumbClassesEnum.THUMB_CHECKED : ThumbClassesEnum.THUMB_UNCHECKED
          )
        }/>
    );
  }

  /**
   * @stable [05.06.2020]
   * @returns {IChipProps}
   */
  protected get componentsSettingsProps(): IThumbProps {
    return this.componentsSettings.thumb;
  }
}
