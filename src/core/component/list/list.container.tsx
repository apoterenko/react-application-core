import * as React from 'react';

import { BaseContainer } from '../../component/base';
import { IEntity } from '../../definition.interface';

import { List } from './list.component';
import {
  LIST_DESTROY_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_ADD_ITEM_ACTION_TYPE,
  LIST_SEARCH_ACTION_TYPE,
  IListContainer,
  IListContainerInternalProps,
} from './list.interface';

export class ListContainer extends BaseContainer<IListContainerInternalProps, {}>
    implements IListContainer {

  constructor(props: IListContainerInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(LIST_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return <List onSelect={this.onSelect}
                 onSearch={this.onSearch}
                 onAddItem={this.onAddItem}
                 {...props.listOptions}
                 {...props.list}/>;
  }

  private onSelect(entity: IEntity): void {
    this.dispatch(LIST_SELECT_ACTION_TYPE, { selected: entity });
  }

  private onSearch(): void {
    this.dispatch(LIST_SEARCH_ACTION_TYPE);
  }

  private onAddItem(): void {
    this.dispatch(LIST_ADD_ITEM_ACTION_TYPE);
  }
}
