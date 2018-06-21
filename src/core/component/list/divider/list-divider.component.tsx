import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';

export class ListDivider extends BaseComponent<ListDivider> {

  /**
   * @stable [19.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <hr className={toClassName(
            this.uiFactory.listDivider,
            'rac-list-divider',
            props.className
        )}/>
    );
  }
}
