import * as React from 'react';

import { orNull, toClassName, uuid } from '../../../util';
import { BaseComponent } from '../../../component/base';
import { Link } from '../../../component/link';
import {
  INavigationListInternalProps,
  NavigationListItemTypeEnum,
  INavigationListItem,
} from './navigation-list.interface';

export class NavigationList extends BaseComponent<NavigationList, INavigationListInternalProps, {}> {

  public render(): JSX.Element {
    return <nav className='mdc-list app-navigation-list'>{
      this.props.items.map((item) => this.toElement(item))
    }</nav>;
  }

  private toElement(config: INavigationListItem): JSX.Element {
    switch (config.type) {
      case NavigationListItemTypeEnum.SUB_HEADER:
        return <h3 className='mdc-list-group__subheader' key={uuid()}>{config.text}</h3>;
      case NavigationListItemTypeEnum.DIVIDER:
        return <hr className='mdc-list-divider' key={uuid()}/>;
      default:
        return (
            <Link to={config.link}
                  key={uuid()}
                  className={toClassName('mdc-list-item', config.activated && 'app-active')}>
              {
                orNull(
                    config.icon,
                    <i className={toClassName(
                        'material-icons',
                        config.className && ('mdc-list-item__' + (config.className || 'start-detail'))
                    )}>
                      {config.icon}
                    </i>
                )
              }
              {config.text}
            </Link>
        );
    }
  }
}
