import * as React from 'react';
import * as R from 'ramda';

import { orNull, calc } from '../../../util';
import { IListWrapperProps } from './list-wrapper.interface';
import { BaseComponent } from '../../base';

export class ListWrapper extends BaseComponent<IListWrapperProps> {

  /**
   * @stable [13.10.2018]
   * @returns {React.ReactNode}
   */
  public render(): React.ReactNode {
    const props = this.props;
    const list = props.list;

    return (
      orNull<React.ReactNode>(
        !R.isNil(list.data) && !list.progress,
        () => calc<React.ReactNode | React.ReactNode[]>(props.content)
      )
    );
  }
}
