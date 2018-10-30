import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class SimpleListItem extends BaseComponent<SimpleListItem> {

  /**
   * @stable [29.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName('rac-list-item', props.className)}>
          {props.children}
        </span>
    );
  }
}
