import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../../../component/base';

export class SimpleList extends BaseComponent<SimpleList, IBaseComponentInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <ul className={toClassName(
            this.uiFactory.list,
            this.uiFactory.listNonInteractive,
            this.uiFactory.listTwoLine,
            props.className
        )}>
          {props.children}
        </ul>
    );
  }
}
