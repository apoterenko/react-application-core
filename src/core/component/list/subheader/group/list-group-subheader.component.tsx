import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../../component/base';

export class ListGroupSubHeader extends BaseComponent<ListGroupSubHeader, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <h3 className={toClassName(
            this.uiFactory.listGroupSubHeader,
            props.className
        )}>
          {props.children}
        </h3>
    );
  }
}
