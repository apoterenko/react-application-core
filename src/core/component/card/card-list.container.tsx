import * as React from 'react';

import { UniversalBaseListContainer } from '../list';
import { CardList } from './card-list.component';
import { ICardListContainerProps } from './card-list.interface';

export class CardListContainer extends UniversalBaseListContainer<ICardListContainerProps> {

  /**
   * @stable [05.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return <CardList onSelect={this.onSelect}
                     onCreate={this.onCreate}
                     {...props.listConfiguration}
                     {...props.list}/>;
  }
}
