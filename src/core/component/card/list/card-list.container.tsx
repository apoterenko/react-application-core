import * as React from 'react';

import { UniversalBaseListContainer } from '../../list';
import { CardList } from './card-list.component';
import { ICardListContainerProps } from './card-list.interface';

export class CardListContainer extends UniversalBaseListContainer<ICardListContainerProps> {

  /**
   * @stable [06.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <CardList {...this.getComponentProps()}
                     {...this.props.listConfiguration}/>;
  }
}
