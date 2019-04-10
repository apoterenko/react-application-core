import * as React from 'react';

import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';
import { IChipProps } from './chip.interface';

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
              type: 'close',
              key: `chip-key-${props.id}`,
              disabled: props.disabled,
              onClick: props.onClick,
            })
          }
        </FlexLayout>
      </div>
    );
  }
}
