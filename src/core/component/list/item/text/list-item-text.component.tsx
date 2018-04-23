import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../../component/base';

export class ListItemText extends BaseComponent<ListItemText> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItemText,
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
