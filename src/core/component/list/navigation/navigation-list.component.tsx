import * as React from 'react';
import * as R from 'ramda';

import {
  ifNotFalseThanValue,
  joinClassName,
  nvl,
  orNull,
  uuid,
} from '../../../util';
import { Link } from '../../link';
import { INavigationListProps } from './navigation-list.interface';
import {
  IComponentsSettingsEntity,
  IDefaultLayoutProps,
  INavigationItemEntity,
  LayoutModesEnum,
  NavigationItemTypesEnum,
} from '../../../definition';
import { UniversalComponent } from '../../base/universal.component';

export class NavigationList
  extends UniversalComponent<INavigationListProps> {

  /**
   * @stable [24.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const items = this.props.items;
    return (
      <nav
        ref={this.selfRef}
        className='rac-navigation-list'
      >
        {this.getListDividerElement()}
        {items.map(this.toElement, this)}
      </nav>
    );
  }

  /**
   * @stable [07.02.2020]
   * @param {string} key
   * @returns {JSX.Element}
   */
  private getListDividerElement(key?: string): JSX.Element {
    return (
      <div
        key={key}
        className='rac-list-divider'/>
    );
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {JSX.Element}
   */
  private toElement(item: INavigationItemEntity): JSX.Element {
    const isExpanded = this.isItemExpanded(item);
    const fullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);
    const ind = this.props.items.length - 1 -
      [...this.props.items].reverse().findIndex((itm) => itm.type === NavigationItemTypesEnum.SUB_HEADER);

    switch (item.type) {
      case NavigationItemTypesEnum.SUB_HEADER:
        const isGroupItemActive = !isExpanded && this.hasActiveChild(item);
        return (
          <div
            key={this.asUniqueKey(item.label, 'label')}
            className={joinClassName(
              this.buildItemClassNames(true, isGroupItemActive, isExpanded),
              ind === this.props.items.lastIndexOf(item) && !isExpanded && 'rac-navigation-list__last-section',
            )}
            title={label}
            onClick={() => this.onGroupLinkClick(item)}
          >
            {this.uiFactory.makeIcon({
              key: this.asUniqueKey(item.label, 'group-icon'),
              type: item.icon || 'list',
            })}
            {fullLayoutModeEnabled && label}
            {fullLayoutModeEnabled && this.uiFactory.makeIcon({
              key: this.asUniqueKey(item.label, 'group-expand-icon'),
              type: isExpanded ? 'dropdown-opened' : 'dropdown',
              className: 'rac-navigation-list__expand-icon',
            })}
          </div>
        );
      case NavigationItemTypesEnum.DIVIDER:
        return ifNotFalseThanValue(
          this.props.dividerRendered,
          () => this.getListDividerElement(
            R.isNil(item.parent)
              ? uuid()
              : this.asUniqueKey(item.parent.label, 'divider')
          )
        );
      default:
        const isGroup = R.isNil(item.parent);
        return orNull(isExpanded || isGroup, () => this.asItemElement(item));
    }
  }

  /**
   * @stable [12.02.2020]
   * @param {INavigationItemEntity} item
   * @returns {JSX.Element}
   */
  private asItemElement(item: INavigationItemEntity): JSX.Element {
    const isFullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);
    const isGroup = R.isNil(item.parent);
    const isExpanded = this.isItemExpanded(item);

    return (
      <Link
        to={item.link}
        key={this.asUniqueKey(item.link, 'link')}
        className={this.buildItemClassNames(isGroup, item.active, isExpanded)}
        title={label}
      >
        {this.uiFactory.makeIcon({
          type: item.icon,
          key: this.asUniqueKey(item.link, 'icon'),
          className: 'rac-navigation-list__item-icon',
        })}
        {isFullLayoutModeEnabled && label}
      </Link>
    );
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} config
   */
  private onGroupLinkClick(config: INavigationItemEntity): void {
    const props = this.props;
    if (props.onGroupClick) {
      props.onGroupClick(config);
    }
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {boolean}
   */
  private isItemExpanded(item: INavigationItemEntity): boolean {
    const expandedGroups = this.props.expandedGroups;
    return expandedGroups[item.value] === true
      || (!R.isNil(item.parent) && expandedGroups[item.parent.value] === true);
  }

  /**
   * @stable [23.09.2018]
   * @returns {boolean}
   */
  private get isFullLayoutModeEnabled(): boolean {
    return this.layoutMode === LayoutModesEnum.FULL;
  }

  private get layoutMode(): LayoutModesEnum {
    return nvl(this.systemLayoutMode, this.props.mode);
  }

  /**
   * @stable [04.02.2020]
   * @returns {LayoutModesEnum}
   */
  private get systemLayoutMode(): LayoutModesEnum {
    return this.systemSettings.layoutMode;
  }

  /**
   * @stable [04.02.2020]
   * @returns {IDefaultLayoutProps}
   */
  private get systemSettings(): IDefaultLayoutProps {
    const {defaultLayout = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return defaultLayout;
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {boolean}
   */
  private hasActiveChild(item: INavigationItemEntity): boolean {
    const activeItem = R.find((itm) => !!itm.active, this.props.items);
    return !R.isNil(activeItem) && !R.isNil(R.find((child) => child.link === activeItem.link, item.children || []));
  }

  /**
   * @stable [07.02.2020]
   * @param {boolean} isGroup
   * @param {boolean} isActive
   * @param {boolean} isExpanded
   * @returns {string}
   */
  private buildItemClassNames(isGroup: boolean,
                              isActive: boolean,
                              isExpanded: boolean): string {
    return (
      joinClassName(
        'rac-navigation-list__section',
        isGroup ? 'rac-navigation-list__group-section' : 'rac-navigation-list__item-section',
        isActive
          ? 'rac-navigation-list__active-section'
          : (isExpanded ? 'rac-navigation-list__expanded-section' : ''),
      )
    );
  }

  /**
   * @stable [07.02.2020]
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private asUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }
}
