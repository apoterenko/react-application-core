import * as React from 'react';
import * as ramda from 'ramda';

import { BaseContainer } from 'core/component/base';
import { IEntity } from 'core/definition.interface';

import { List } from './list.component';
import {
  LIST_DESTROY_ACTION_TYPE,
  LIST_LOAD_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  IListContainer,
  IListContainerInternalProps,
} from './list.interface';

export class ListContainer extends BaseContainer<IListContainerInternalProps, {}>
    implements IListContainer {

  constructor(props: IListContainerInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(LIST_DESTROY_ACTION_TYPE);
  }

  public shouldComponentUpdate(nextProps: IListContainerInternalProps, nextState: {}): boolean {
    return !ramda.equals(nextProps.list, this.props.list);
  }

  public render(): JSX.Element {
    const props = this.props;
    const { list } = props;
    return list.progress
        ? (
            <div className='mdc-layout-grid'>
              <div className='mdc-layout-grid__inner'>
                {this.t(props.progressMessage || 'Loading...')}
              </div>
            </div>
        )
        : (
            <List items={this.listData || []}
                  activeItem={list.selected}
                  onClick={this.onSelect}
                  {...props}>
            </List>
        );
  }

  public load(value: string): void {
    if (value) {
      this.dispatch(LIST_LOAD_ACTION_TYPE, { query: value });
    }
  }

  private onSelect(entity: IEntity): void {
    this.dispatch(LIST_SELECT_ACTION_TYPE, { selected: entity });
  }

  private get listData(): IEntity[] {
    return this.props.list.data;
  }
}
