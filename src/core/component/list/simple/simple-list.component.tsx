import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { ISimpleListProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<SimpleList, ISimpleListProps> {

  /**
   * @stable [14.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <ul ref='self'
          className={toClassName('rac-list', props.full !== false && 'rac-flex-full', props.className)}>
        {props.children}
      </ul>
    );
  }
}
