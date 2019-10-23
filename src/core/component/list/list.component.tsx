import * as React from 'react';

import { toClassName, isOddNumber } from '../../util';
import { IEntity } from '../../definitions.interface';
import { ListItem } from './item';
import { SimpleList } from '../list/simple';
import { BaseList } from './base-list.component';
import { IListProps } from '../../props-definitions.interface';

export class List extends BaseList<IListProps> {

  /**
   * [30.10.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <SimpleList ref='container'
                  {...props}>
        {this.dataSource.map((item, index) => this.getItem(item, index))}
        {this.addActionElement}
      </SimpleList>
    );
  }

  /**
   * @stable [13.09.2018]
   * @param {IEntity} entity
   * @param {number} index
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity, index: number): JSX.Element {
    const props = this.props;
    const rowKey = this.toRowKey(entity);
    return (
      <ListItem ref={rowKey}
                key={rowKey}
                index={index}
                rawData={entity}
                selected={this.isEntitySelected(entity)}
                onClick={this.onSelect}
                {...props.itemConfiguration}
                className={
                  toClassName(
                    props.itemConfiguration.className,
                    props.highlightOdd !== false && (isOddNumber(index) ? 'rac-list-item-odd' : '')
                  )
                }/>
    );
  }
}
