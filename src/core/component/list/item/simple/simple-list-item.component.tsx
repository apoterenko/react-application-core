import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../base';

export class SimpleListItem extends BaseComponent<SimpleListItem, IBaseComponentInternalProps, {}> {

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
