import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../../component/base';

export class ListItemGraphic extends BaseComponent<ListItemGraphic, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <span className={toClassName(
            this.uiFactory.listItemGraphic,
            props.className
        )}>
          {props.children}
        </span>
    );
  }
}
