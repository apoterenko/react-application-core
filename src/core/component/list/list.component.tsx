import * as React from 'react';

import { toClassName } from '../../util';
import { IEntity } from '../../definitions.interface';
import { ListItem } from './item';
import { SimpleList } from '../list/simple';
import { BaseList } from './base-list.component';
import { IListProps } from '../../props-definitions.interface';

export class List extends BaseList<List, IListProps> {

  /**
   * [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <SimpleList ref='container'
                  nonInteractive={false}
                  useAvatar={true}
                  simple={false}
                  {...props}
                  className={toClassName('rac-list', props.className)}>
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
                rawData={entity}
                active={this.isEntitySelected(entity)}
                onClick={this.onSelect}
                {...props.itemConfiguration}
                className={toClassName(props.itemConfiguration.className, index % 2 === 0 ? 'rac-list-item-odd' : '')}/>
    );
  }
}
