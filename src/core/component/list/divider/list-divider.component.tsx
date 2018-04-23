import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../../component/base';

export class ListDivider extends BaseComponent<ListDivider> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <hr className={toClassName(
            this.uiFactory.listDivider,
            props.className
        )}/>
    );
  }
}
