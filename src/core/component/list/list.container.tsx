import * as React from 'react';

import { List } from './list.component';
import { IListContainerProps } from './list.interface';
import { UniversalBaseListContainer } from './universal-base-list.container';

export class ListContainer extends UniversalBaseListContainer<IListContainerProps> {

  /**
   * @stable [06.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <List {...this.getComponentProps()}
                 {...this.props.listConfiguration}/>;
  }
}
