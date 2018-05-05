import * as React from 'react';

import { List } from './list.component';
import { IListContainerProps } from './list.interface';
import { UniversalBaseListContainer } from './universal-base-list.container';

export class ListContainer extends UniversalBaseListContainer<IListContainerProps> {

  /**
   * @stable [05.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return <List onSelect={this.onSelect}
                 onCreate={this.onCreate}
                 {...props.listConfiguration}
                 {...props.list}/>;
  }
}
