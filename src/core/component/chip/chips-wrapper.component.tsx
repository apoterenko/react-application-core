import * as React from 'react';

import { BaseComponent } from '../base';

export class ChipsWrapper extends BaseComponent<ChipsWrapper> {

  public render(): JSX.Element {
    return (
        <div className='rac-chips-wrapper'>
          {this.props.children}
        </div>
    );
  }
}
