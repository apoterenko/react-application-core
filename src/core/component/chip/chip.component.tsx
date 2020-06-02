import * as React from 'react';

import { GenericComponent } from '../base';
import {
  IChipProps,
  IconsEnum,
} from '../../definition';

/**
 * @component-impl
 * @stable [02.06.2020]
 */
export class Chip extends GenericComponent<IChipProps> {

  /**
   * @stable [02.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      disabled,
      onClick,
    } = this.mergedProps;

    const {children} = this.props;

    return (
      <div className='rac-chip'>
        <span
          className='rac-chip__content'
          title={String(children)}
        >
          {children}
        </span>
        {
          this.uiFactory.makeIcon({
            className: 'rac-chip__close',
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
