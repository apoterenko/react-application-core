import * as React from 'react';

import { joinClassName, fullFlexClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { ISimpleListProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<ISimpleListProps> {

  /**
   * @stable [23.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <ul
        ref={this.selfRef}
        className={joinClassName('rac-list', fullFlexClassName(props), props.className)}>
        {props.children}
      </ul>
    );
  }
}
