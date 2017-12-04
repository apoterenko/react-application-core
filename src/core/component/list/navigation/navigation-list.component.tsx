import * as React from 'react';

import { toClassName, uuid } from '../../../util';
import { BaseComponent } from '../../../component/base';
import { Link } from '../../../component/link';
import {
  INavigationListInternalProps,
  NavigationListItemTypeEnum,
  INavigationListItemOptions,
} from './navigation-list.interface';

export class NavigationList extends BaseComponent<NavigationList, INavigationListInternalProps, {}> {

  public render(): JSX.Element {
    return <nav className='mdc-list rac-navigation-list'>{
      this.props.items.map((item) => this.toElement(item))
    }</nav>;
  }

  private toElement(options: INavigationListItemOptions): JSX.Element {
    switch (options.type) {
      case NavigationListItemTypeEnum.SUB_HEADER:
        return <h3 className='mdc-list-group__subheader' key={uuid()}>{options.label}</h3>;
      case NavigationListItemTypeEnum.DIVIDER:
        return <hr className='mdc-list-divider' key={uuid()}/>;
      default:
        return (
            <Link to={options.link}
                  key={uuid()}
                  className={toClassName('mdc-list-item', options.active && 'rac-list-item-active')}>
              {this.uiFactory.makeIcon(options.icon)}
              {options.label}
            </Link>
        );
    }
  }
}
