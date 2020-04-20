import * as React from 'react';

import { BaseComponent } from '../base';
import { FlexLayout } from '../layout/flex';
import { IChipProps } from './chip.interface';
import { IconsEnum } from '../../definition';

export class Chip extends BaseComponent<IChipProps> {

  /**
   * @stable [09.04.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className='rac-chip'>
        <FlexLayout
          row={true}
          alignItemsCenter={true}>
          <span
            className='rac-chip-description rac-overflow-ellipsis'
            title={String(props.children)}>
            {props.children}
          </span>
          {
            this.uiFactory.makeIcon({
              type: IconsEnum.TIMES,
              disabled: props.disabled,
              onClick: props.onClick,
            })
          }
        </FlexLayout>
      </div>
    );
  }
}
