import * as React from 'react';

import { toClassName } from '../../util';
import { IEntity } from '../../definitions.interface';
import { BaseList } from '../list';
import { Card } from './card.component';
import { ICardListProps } from './card-list.interface';

export class CardList extends BaseList<CardList, ICardListProps> {

  /**
   * @stable [02.05.2018]
   * @returns {JSX.Element}
   */
  protected getView(): JSX.Element {
    const props = this.props;
    return (
      <div ref='container'
           className={toClassName('rac-card-list', props.className)}>
        {this.getDataSource().map((item) => this.getItem(item))}
        {this.getAddAction()}
      </div>
    );
  }

  /**
   * @stable [02.05.2018]
   * @param {IEntity} entity
   * @returns {JSX.Element}
   */
  protected getItem(entity: IEntity): JSX.Element {
    const props = this.props;
    const itemConfiguration = props.itemConfiguration;
    return (
      <Card key={this.toRowKey(entity)}
            rippable={true}
            className='rac-card-list-item'
            actionButtons={itemConfiguration && itemConfiguration.actionButtons
                              && itemConfiguration.actionButtons(entity)}
            actionIcons={itemConfiguration && itemConfiguration.actionIcons
                            && itemConfiguration.actionIcons(entity)}
            onClick={() => this.onSelect(entity)}>
        {itemConfiguration.renderer(entity)}
      </Card>
    );
  }
}
