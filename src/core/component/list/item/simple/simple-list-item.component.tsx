import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../../component/base';

export class SimpleListItem extends BaseComponent<SimpleListItem, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItem,
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
