import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../../component/base';

export class ListItemSecondaryText extends BaseComponent<ListItemSecondaryText, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItemSecondaryText,
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
