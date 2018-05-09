import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';

export class PageInfo extends BaseComponent<PageInfo> {

  /**
   * @stable [09.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className={toClassName(
              'rac-toolbar-info',
              this.props.className,
            )}>
        {this.props.children}
      </div>
    );
  }
}
