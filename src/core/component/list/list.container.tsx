import * as React from 'react';

import { BaseContainer } from '../base';
import { IEntity, ISelectedWrapper } from '../../definition.interface';

import { List } from './list.component';
import {
  LIST_SELECT_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
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
    this.onCreate = this.onCreate.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return <List onSelect={this.onSelect}
                 onSearch={this.onSearch}
                 onCreate={this.onCreate}
                 {...props.listOptions}
                 {...props.list}/>;
  }

  private onSelect(entity: IEntity): void {
    const actionParams: ISelectedWrapper<IEntity> = { selected: entity };
    this.dispatch(LIST_SELECT_ACTION_TYPE, actionParams);
  }

  private onSearch(): void {
    this.dispatch(LIST_SEARCH_ACTION_TYPE);
  }

  private onCreate(): void {
    this.dispatch(LIST_CREATE_ACTION_TYPE);
  }
}
