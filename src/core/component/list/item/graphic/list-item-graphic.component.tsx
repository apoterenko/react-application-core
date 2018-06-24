import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';

export class ListItemGraphic extends BaseComponent<ListItemGraphic> {

  /**
   * @stable [24.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <span {...props}
              className={toClassName(
                            'rac-list-item-graphic',
                            this.uiFactory.listItemGraphic,
                            props.className)}>
          {props.children}
        </span>
    );
  }
}
