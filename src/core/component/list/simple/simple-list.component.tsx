import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { ISimpleListInternalProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<SimpleList, ISimpleListInternalProps> {

  /**
   * @stable [30.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
        <ul ref='self'
            className={toClassName('rac-list', 'rac-flex-full', props.className)}>
          {props.children}
        </ul>
    );
  }
}
