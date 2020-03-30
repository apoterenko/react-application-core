import * as React from 'react';

import { BaseListContainer } from './base-list.container';
import { IListContainerProps } from '../../definition';
import { List } from './list.component';

export class ListContainer extends BaseListContainer<IListContainerProps> {

  /**
   * @stable [30.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <List
        {...this.getComponentProps()}
        {...this.props.listConfiguration}/>
    );
  }
}
