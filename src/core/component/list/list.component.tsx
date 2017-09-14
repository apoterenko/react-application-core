import * as React from 'react';

import { uuid } from 'core/util';
import { IEntity } from 'core/definition.interface';
import { BaseComponent } from 'core/component/base';

import { ListItem } from './item';
import { IListInternalProps } from './list.interface';

export class List extends BaseComponent<List, IListInternalProps, {}> {

  public static defaultProps: IListInternalProps = {
    items: [],
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const listItems = props.items.map(
        (item) => (
            <ListItem key={uuid()}
                      rawData={item}
                      renderer={props.renderer}
                      active={this.isItemActive(item)}
                      onClick={this.onClick}>
            </ListItem>
        ),
    );
    return <ul className='mdc-list'>{listItems}</ul>;
  }

  private isItemActive(item: IEntity): boolean {
    return this.props.activeItem && this.props.activeItem.id === item.id;
  }

  private onClick(entity: IEntity): void {
    if (this.props.onClick) {
      this.props.onClick(entity);
    }
  }
}
