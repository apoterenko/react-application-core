import * as React from 'react';

import { BaseComponent, IBaseComponentInternalProps } from '../base';

export class ChipsWrapper extends BaseComponent<ChipsWrapper, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    return (
        <div className='rac-chips-wrapper'>
          {this.props.children}
        </div>
    );
  }
}
