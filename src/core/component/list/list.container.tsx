import * as React from 'react';

import { BaseContainer } from 'core/component/base';
import { IEntity } from 'core/definition.interface';

import { List } from './list.component';
import {
  LIST_DESTROY_ACTION_TYPE,
  LIST_LOAD_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_ADD_ITEM_ACTION_TYPE,
  IListContainer,
  IListContainerInternalProps,
} from './list.interface';

export class ListContainer extends BaseContainer<IListContainerInternalProps, {}>
    implements IListContainer {

  constructor(props: IListContainerInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(LIST_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return <List onSelect={this.onSelect}
                 onAddItem={this.onAddItem}
                 {...props.listOptions}
                 {...props.list}/>;
  }

  public load(value: string): void {
    const props = this.props;
    if ((props.listOptions && props.listOptions.noQuery) || value) {
      this.dispatch(LIST_LOAD_ACTION_TYPE, { query: value });
    }
  }

  private onSelect(entity: IEntity): void {
    this.dispatch(LIST_SELECT_ACTION_TYPE, { selected: entity });
  }

  private onAddItem(): void {
    this.dispatch(LIST_ADD_ITEM_ACTION_TYPE);
  }
}
