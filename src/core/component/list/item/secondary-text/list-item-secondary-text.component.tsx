import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class ListItemSecondaryText extends BaseComponent<ListItemSecondaryText> {

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
                            this.uiFactory.listItemSecondaryText,
                            'rac-list-item-secondary-text',
                            props.className
                        )}>
          {props.children}
        </span>
    );
  }
}
