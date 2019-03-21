import * as React from 'react';

import { BaseComponent } from '../base';
import { IChipInternalProps } from './chip.interface';
import { FlexLayout } from '../layout';

export class Chip extends BaseComponent<IChipInternalProps> {

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
              disabled: props.disabled,
              onClick: props.onClick,
            })
          }
        </FlexLayout>
      </div>
    );
  }
}
