import * as React from 'react';

import { List } from './list.component';
import { IListContainerInternalProps } from './list.interface';
import { LIST_CREATE_ACTION_TYPE, LIST_SEARCH_ACTION_TYPE } from './list-reducer.interface';
import { BaseListContainer } from './base-list.container';

export class ListContainer extends BaseListContainer<IListContainerInternalProps> {

  constructor(props: IListContainerInternalProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return <List onSelect={this.onSelect}
                 onSearch={this.onSearch}
                 onCreate={this.onCreate}
                 {...props.listConfiguration}
                 {...props.list}/>;
  }

  private onSearch(): void {
    this.dispatch(LIST_SEARCH_ACTION_TYPE);
  }

  private onCreate(): void {
    this.dispatch(LIST_CREATE_ACTION_TYPE);
  }
}
