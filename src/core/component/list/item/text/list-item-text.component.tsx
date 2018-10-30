import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class ListItemText extends BaseComponent<ListItemText> {

  /**
   * @stable [04.07.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <span className={toClassName('rac-list-item-text', props.className)}>
        {props.children}
      </span>
    );
  }
}
