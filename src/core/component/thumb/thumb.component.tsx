import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
} from '../../util';
import {
  IThumbProps,
  ThumbClassesEnum,
} from '../../definition';
import { GenericComponent } from '../base/generic.component';

export class Thumb extends GenericComponent<IThumbProps> {

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
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): IThumbProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.thumb
    );
  }
}
