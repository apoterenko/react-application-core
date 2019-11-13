import * as React from 'react';

import { joinClassName } from '../../../util';
import { BaseComponent } from '../../base';

export class ListDivider extends BaseComponent {

  /**
   * @stable [19.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <div
        className={joinClassName(
          'rac-list-divider',
          props.className
        )}/>
    );
  }
}
