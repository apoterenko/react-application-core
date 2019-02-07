import * as React from 'react';

import { BaseComponent } from '../base';
import { IChipInternalProps } from './chip.interface';

export class Chip extends BaseComponent<Chip, IChipInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;
    return (
        <div className='rac-chip'>
          <span className='rac-chip-description rac-overflow-ellipsis'
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
        </div>
    );
  }
}
