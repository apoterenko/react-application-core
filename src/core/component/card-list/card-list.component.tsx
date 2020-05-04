import * as React from 'react';

import {
  calc,
  isFull,
  joinClassName,
} from '../../util';
import {
  ICardListProps,
  ListClassesEnum,
} from '../../definition';
import { IEntity } from '../../definitions.interface';
import { BaseList } from '../list';
import { Card } from './card';

export class CardList extends BaseList<ICardListProps> {

  /**
   * @stable [04.05.2020]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref={this.selfRef}
        className={
          joinClassName(
            ListClassesEnum.LIST,
            ListClassesEnum.CARD_LIST,
            isFull(props) && ListClassesEnum.FULL_LIST,
            props.className
          )
        }>
        {this.dataSource.map(this.getItem, this)}
      </div>
    );
  }

  /**
   * @stable [04.05.2020]
   * @param {IEntity} entity
   * @param {number} index
   * @returns {JSX.Element}
   */
  private getItem(entity: IEntity, index: number): JSX.Element {
    const {
      onSelect,
      itemConfiguration = {},
    } = this.props;

    return (
      <Card
        key={this.toRowKey(entity)}
        className={
          joinClassName(
            ListClassesEnum.LIST_ITEM,
            `rac-list-item-${index}`,
            calc(itemConfiguration.className, entity)
          )
        }
        onClick={onSelect}
      >
        {itemConfiguration.renderer(entity)}
      </Card>
    );
  }
}
