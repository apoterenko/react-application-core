import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';

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
   * @stable [11.08.2018]
   * @param {INavigationListProps} props
   */
  constructor(props: INavigationListProps) {
    super(props);
    this.onLinkClick = this.onLinkClick.bind(this);
  }

  /**
   * @stable [11.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const props = this.props;
    if (!R.isNil(props.x) || !R.isNil(props.y)) {
      this.selfAsHtmlElement.scrollTo(props.x, props.y);
    }
  }

  /**
   * @stable [22.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
        <nav ref='self'
             className={toClassName(this.uiFactory.list, 'rac-navigation-list')}>
          <ListDivider/>
          {this.props.items.map((item) => this.toElement(item))}
        </nav>
    );
  }

  /**
   * @stable [10.08.2018]
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
                  key={options.link}
                  className={toClassName(
                      this.uiFactory.listItem,
                      'rac-navigation-list-item',
                      options.active && 'rac-list-item-active'
                  )}
                  onClick={this.onLinkClick}>
              {this.uiFactory.makeIcon(options.icon)}
              {options.label}
              {orNull<JSX.Element>(
                options.active,
                () => <div className='rac-navigation-list-item-active-border'/>
              )}
            </Link>
        );
    }
  }

  /**
   * @stable [11.08.2018]
   */
  private onLinkClick(): void {
    const props = this.props;
    if (props.onChange) {
      const el = $(this.selfAsHtmlElement);
      props.onChange({x: el.scrollLeft(), y: el.scrollTop()});
    }
  }
}
