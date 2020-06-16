import * as React from 'react';

import { GenericComponent } from '../base';
import {
  ChipClassesEnum,
  IChipProps,
  IconsEnum,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
} from '../../util';

/**
 * @component-impl
 * @stable [02.06.2020]
 */
export class Chip extends GenericComponent<IChipProps> {

  public static readonly defaultProps: IChipProps = {
    closable: true,
  };

  /**
   * @stable [02.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      closable,
      disabled,
      onClick,
    } = this.mergedProps;

    return (
      <div
        className={ClsUtils.joinClassName(
          ChipClassesEnum.CHIP,
          CalcUtils.calc(className))
        }>
        <span
          className={ChipClassesEnum.CHIP_CONTENT}
          title={String(this.originalChildren)}
        >
          {this.originalChildren}
        </span>
        {
          closable && this.uiFactory.makeIcon({
            className: ChipClassesEnum.CHIP_CLOSE,
            disabled,
            onClick,
            type: IconsEnum.TIMES,
          })
        }
      </div>
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IChipProps}
   */
  protected get settingsProps(): IChipProps {
    return this.componentsSettings.chip;
  }
}
