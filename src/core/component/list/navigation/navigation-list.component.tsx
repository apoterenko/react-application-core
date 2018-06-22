import * as React from 'react';

import { orNull, toClassName, uuid } from '../../../util';
import { BaseComponent } from '../../base';
import { Link } from '../../link';
import { INavigationListProps } from './navigation-list.interface';
import {
  INavigationListItemConfiguration,
  NavigationListItemTypeEnum,
} from '../../../configurations-definitions.interface';
import { ListGroupSubHeader, ListDivider } from '../../list';

export class NavigationList extends BaseComponent<NavigationList, INavigationListProps> {

  /**
   * @stable [22.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
        <nav className={toClassName(this.uiFactory.list, 'rac-navigation-list')}>
          <ListDivider/>
          {this.props.items.map((item) => this.toElement(item))}
        </nav>
    );
  }

  /**
   * @stable [22.06.2018]
   * @param {INavigationListItemConfiguration} options
   * @returns {JSX.Element}
   */
  private toElement(options: INavigationListItemConfiguration): JSX.Element {
    switch (options.type) {
      case NavigationListItemTypeEnum.SUB_HEADER:
        return (
          <ListGroupSubHeader key={uuid()}>
            {options.label}
          </ListGroupSubHeader>
        );
      case NavigationListItemTypeEnum.DIVIDER:
        return <ListDivider key={uuid()}/>;
      default:
        return (
            <Link to={options.link}
                  key={uuid()}
                  className={toClassName(
                      this.uiFactory.listItem,
                      'rac-navigation-list-item',
                      options.active && 'rac-list-item-active'
                  )}>
              {this.uiFactory.makeIcon(options.icon)}
              {options.label}
              {orNull<JSX.Element>(options.active, () => <div className='rac-navigation-list-item-active-border'/>)}
            </Link>
        );
    }
  }
}
