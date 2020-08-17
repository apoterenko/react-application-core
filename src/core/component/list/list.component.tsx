import * as React from 'react';

import { BaseList } from './base-list.component';
import { BasicList } from './basic';
import { IEntity } from '../../definitions.interface';
import { IListProps } from '../../definition';
import { ListItem } from './item';
import { Mappers } from '../../util';

export class List extends BaseList<IListProps, {}, BasicList> {

  /**
   * @stable [17.08.2020]
   */
  protected getView(): JSX.Element {
    return (
      <BasicList
        forwardedRef={this.actualRef}
        {...Mappers.listPropsAsBasicListProps(this.originalProps)}
      >
        {this.dataSource.map(this.getItem, this)}
      </BasicList>
    );
  }

  /**
   * @stable [17.08.2020]
   * @param entity
   * @param index
   */
  protected getItem(entity: IEntity, index: number): JSX.Element {
    const originalProps = this.originalProps;
    const {
      itemConfiguration,
      onSelect,
    } = originalProps;

    return (
      <ListItem
        index={index}
        entity={entity}
        selected={this.isEntitySelected(entity)}
        onClick={onSelect}
        {...itemConfiguration}
        key={this.toRowKey(entity)}/>
    );
  }
}
