import * as React from 'react';
import * as R from 'ramda';

import { toClassName, uuid, orNull, ifNotFalseThanValue, nvl  } from '../../../util';
import { Link } from '../../link';
import { INavigationListProps } from './navigation-list.interface';
import { ListDivider } from '../../list';
import { FlexLayout } from '../../layout/flex';
import {
  INavigationItemEntity,
  LayoutModesEnum,
  NavigationItemTypesEnum,
  IComponentsSettingsEntity,
  IDefaultLayoutProps,
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
        className='rac-navigation-list rac-no-user-select'
      >
        <ListDivider/>
        {items.map(this.toElement, this)}
      </nav>
    );
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationItemEntity} item
   * @returns {JSX.Element}
   */
  private toElement(item: INavigationItemEntity, index: number): JSX.Element {
    const isExpanded = this.isItemExpanded(item);
    const fullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);
    const ind = this.props.items.length - 1 -
      [...this.props.items].reverse().findIndex((itm) => itm.type === NavigationItemTypesEnum.SUB_HEADER);

    switch (item.type) {
      case NavigationItemTypesEnum.SUB_HEADER:
        const isGroupItemActive = !isExpanded && this.hasActiveChild(item);
        return (
          <FlexLayout key={this.toUniqueKey(item.label, 'label')}
                      row={true}
                      alignItemsCenter={true}
                      className={toClassName(
                        'rac-navigation-list__section',
                        'rac-navigation-list__group-section',
                        'rac-navigation-list__group',
                        ind === this.props.items.lastIndexOf(item) && !isExpanded && 'rac-navigation-list__last-section',
                        isGroupItemActive
                          ? 'rac-navigation-list-item-active'
                          : (isExpanded ? 'rac-navigation-list__expanded-section' : ''),
                      )}
                      title={label}
                      onClick={() => this.onGroupLinkClick(item)}>
            {this.uiFactory.makeIcon({
              key: this.toUniqueKey(item.label, 'group-icon'),
              type: item.icon || 'list',
              className: 'rac-navigation-list-icon',
            })}
            {
              orNull<JSX.Element>(
                fullLayoutModeEnabled,
                () => <span className='rac-navigation-list-group-label rac-flex-full'>{label}</span>
              )
            }
            {orNull<JSX.Element>(
              fullLayoutModeEnabled,
              () => (
                this.uiFactory.makeIcon({
                  key: this.toUniqueKey(item.label, 'group-expand-icon'),
                  type: isExpanded ? 'dropdown-opened' : 'dropdown',
                  className: 'rac-navigation-list-group-expand-icon rac-navigation-list-icon',
                })
              )
            )}
          </FlexLayout>
        );
      case NavigationItemTypesEnum.DIVIDER:
        return ifNotFalseThanValue(
          this.props.dividerRendered,
          () => <ListDivider key={R.isNil(item.parent) ? uuid() : this.toUniqueKey(item.parent.label, 'divider')}/>
        );
      default:
        const hasItemParent = R.isNil(item.parent);
        return orNull<JSX.Element>(
          isExpanded || hasItemParent,
          () => (
            this.getItemElement(item)
          )
        );
    }
  }

  private getItemElement(item: INavigationItemEntity): JSX.Element {
    const isFullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);
    const hasItemParent = R.isNil(item.parent);
    const isExpanded = this.isItemExpanded(item);

    return (
      <Link
        to={item.link}
        key={this.toUniqueKey(item.link, 'link')}
        className={toClassName(
          'rac-navigation-list__section',
          hasItemParent ? 'rac-navigation-list__group-section' : 'rac-navigation-list__item-section',
          'rac-navigation-list-item',
          item.active
            ? 'rac-navigation-list-item-active'
            : (isExpanded ? 'rac-navigation-list__expanded-section' : ''),
          hasItemParent && 'rac-navigation-list__item-as-group',
          'rac-flex',
          'rac-flex-row',
          'rac-flex-full',
          'rac-flex-align-items-center'
        )}
        title={label}>
        {this.uiFactory.makeIcon({
          type: item.icon,
          key: this.toUniqueKey(item.link, 'icon'),
          className: 'rac-navigation-list-icon',
        })}
        {
          orNull<JSX.Element>(
            isFullLayoutModeEnabled,
            () => <span className='rac-navigation-list-item-label'>{label}</span>
          )
        }
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
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private toUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
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
}
