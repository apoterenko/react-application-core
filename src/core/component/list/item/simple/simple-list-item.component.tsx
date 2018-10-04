import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class SimpleListItem extends BaseComponent<SimpleListItem> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItem,
            'rac-list-item',
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
