import * as React from 'react';

import { uuid } from 'core/util';
import { BaseComponent } from 'core/component/base';
import { Link } from 'core/component/link';

import { INavigationListInternalProps } from './navigation-list.interface';

export class NavigationList extends BaseComponent<NavigationList,
                                                  INavigationListInternalProps,
                                                  {}> {

  public render(): JSX.Element {
    const list = this.props.items.map((item) => {
      const itemCls = ['mdc-list-item', item.activated && 'app-active'];

      const iconCls = [
        'material-icons',
        item.className && ('mdc-list-item__' + (item.className || 'start-detail'))
      ];

      const iconTpl = item.icon
          ? (
              <i className={iconCls.filter((cls) => !!cls).join(' ')}>
                {item.icon}
              </i>
          )
          : null;

      return (
          <Link to={item.link}
                key={uuid()}
                className={itemCls.filter((cls) => !!cls).join(' ')}>
            {iconTpl}
            {this.t(item.text)}
          </Link>
      );
    });

    return (
        <nav className='mdc-list app-navigation-list'>
          {list}
        </nav>
    );
  }
}
