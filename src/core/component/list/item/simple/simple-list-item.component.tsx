import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class SimpleListItem extends BaseComponent<SimpleListItem> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItem,
            'rac-simple-list-item',
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
