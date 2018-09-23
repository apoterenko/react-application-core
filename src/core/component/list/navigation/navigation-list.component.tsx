import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';

import { toClassName, uuid, orNull } from '../../../util';
import { BaseComponent } from '../../base';
import { Link } from '../../link';
import { INavigationListProps } from './navigation-list.interface';
import { INavigationListItemConfiguration, NavigationListItemTypeEnum } from '../../../configurations-definitions.interface';
import { ListDivider } from '../../list';
import { FlexLayout } from '../../layout';

export class NavigationList extends BaseComponent<NavigationList, INavigationListProps> {

  /**
   * @stable [11.08.2018]
   * @param {INavigationListProps} props
   */
  constructor(props: INavigationListProps) {
    super(props);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.toElement = this.toElement.bind(this);
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
             className='rac-navigation-list rac-no-user-select'>
          <ListDivider/>
          {this.props.items.map(this.toElement)}
        </nav>
    );
  }

  /**
   * @stable [10.08.2018]
   * @param {INavigationListItemConfiguration} item
   * @returns {JSX.Element}
   */
  private toElement(item: INavigationListItemConfiguration): JSX.Element {
    const isExpanded = this.isItemExpanded(item);

    switch (item.type) {
      case NavigationListItemTypeEnum.SUB_HEADER:
        return (
          <FlexLayout key={this.toUniqueKey(item.label, 'label')}
                      row={true}
                      alignItemsCenter={true}
                      className={toClassName(
                        'rac-navigation-list-group-subheader',
                        isExpanded && 'rac-navigation-list-group-subheader-expanded',
                      )}
                      onClick={() => this.onGroupLinkClick(item)}>
            {this.uiFactory.makeIcon({
              key: this.toUniqueKey(item.label, 'group-icon'),
              type: item.icon || 'object_group_regular',
              className: 'rac-navigation-list-group-subheader-icon',
            })}
            <span className='rac-navigation-list-group-label'>{this.t(item.label)}</span>
          </FlexLayout>
        );
      case NavigationListItemTypeEnum.DIVIDER:
        return <ListDivider key={R.isNil(item.parent) ? uuid() : this.toUniqueKey(item.parent.label, 'divider')}/>;
      default:
        return orNull<JSX.Element>(
          isExpanded,
          () => (
            <Link to={item.link}
                  key={this.toUniqueKey(item.link, 'link')}
                  className={toClassName(
                    'rac-navigation-list-item',
                    item.active
                      ? 'rac-navigation-list-item-active'
                      : (isExpanded ? 'rac-navigation-list-item-expanded' : ''),
                    'rac-flex',
                    'rac-flex-row',
                    'rac-flex-full',
                    'rac-flex-align-items-center'
                  )}
                  onClick={this.onLinkClick}>
              {this.uiFactory.makeIcon({
                type: item.icon,
                key: this.toUniqueKey(item.link, 'icon'),
                className: 'rac-navigation-list-icon',
              })}
              <span className='rac-navigation-list-item-label'>{this.t(item.label)}</span>
            </Link>
          )
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

  /**
   * @stable [23.09.2018]
   * @param {INavigationListItemConfiguration} config
   */
  private onGroupLinkClick(config: INavigationListItemConfiguration): void {
    const props = this.props;
    if (props.onGroupChange) {
      props.onGroupChange(config);
    }
  }

  /**
   * @stable [23.09.2018]
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private toUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationListItemConfiguration} item
   * @returns {boolean}
   */
  private isItemExpanded(item: INavigationListItemConfiguration): boolean {
    const expandedGroups = this.props.expandedGroups;
    if (R.isNil(expandedGroups)) {
      return false;
    }
    return expandedGroups[item.value] === true
      || (!R.isNil(item.parent) && expandedGroups[item.parent.value] === true);
  }
}
