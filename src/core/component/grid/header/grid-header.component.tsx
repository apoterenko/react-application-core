import * as React from 'react';

import {
  IGridHeaderProps,
  UniversalStickyContext,
} from '../../../definition';
import {
  joinClassName,
} from '../../../util';
import { BaseComponent } from '../../base';

export class GridHeader extends BaseComponent<IGridHeaderProps> {

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <UniversalStickyContext.Consumer>
        {(stickyElementClassName) => (
          <thead className={
            joinClassName(
              'rac-grid-head',
              props.stickyHead && stickyElementClassName
            )
          }>
          {props.children}
          </thead>
        )}
      </UniversalStickyContext.Consumer>
    );
  }
}
