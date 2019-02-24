import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class ListGroupSubHeader extends BaseComponent {

  /**
   * @stable [19.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <h3 className={toClassName(this.uiFactory.listGroupSubHeader, 'rac-list-group-subheader', props.className)}>
          {props.children}
        </h3>
    );
  }
}
