import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  WrapperUtils,
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
    const mergedProps = this.mergedProps;
    const {className} = mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            ListClassesEnum.LIST,
            ListClassesEnum.CARD_LIST,
            WrapperUtils.isFull(mergedProps) && ListClassesEnum.FULL_LIST,
            className
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
          ClsUtils.joinClassName(
            ListClassesEnum.LIST_ITEM,
            `rac-list-item-${index}`,
            CalcUtils.calc(itemConfiguration.className, entity)
          )
        }
        selected={this.isEntitySelected(entity)}
        rawData={entity}
        onClick={onSelect}
      >
        {itemConfiguration.renderer(entity)}
      </Card>
    );
  }
}
