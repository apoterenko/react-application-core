import * as React from 'react';

import { toClassName, uuid } from '../../../util';
import { BaseComponent } from '../../../component/base';
import { Link } from '../../../component/link';
import { INavigationListProps } from './navigation-list.interface';
import {
  INavigationListItemConfiguration,
  NavigationListItemTypeEnum,
} from '../../../configurations-definitions.interface';

export class NavigationList extends BaseComponent<NavigationList, INavigationListProps> {

  public render(): JSX.Element {
    return (
        <nav className={toClassName(this.uiFactory.list, 'rac-navigation-list')}>{
          this.props.items.map((item) => this.toElement(item))
        }</nav>
    );
  }

  private toElement(options: INavigationListItemConfiguration): JSX.Element {
    switch (options.type) {
      case NavigationListItemTypeEnum.SUB_HEADER:
        return <h3 className={this.uiFactory.listGroupSubHeader} key={uuid()}>
                {options.label}
               </h3>;
      case NavigationListItemTypeEnum.DIVIDER:
        return <hr className={this.uiFactory.listDivider} key={uuid()}/>;
      default:
        return (
            <Link to={options.link}
                  key={uuid()}
                  className={toClassName(
                      this.uiFactory.listItem,
                      'rac-navigation-list-item',
                      options.active && 'rac-list-item-active'
                  )}>
              {this.uiFactory.makeIcon({
                type: options.icon,
                className: 'rac-navigation-icon',
              })}
              {options.label}
            </Link>
        );
    }
  }
}
