import * as React from 'react';
import * as R from 'ramda';

import {
  ifNotFalseThanValue,
  ifNotNilThanValue,
  joinClassName,
  notNilValuesArrayFilter,
  nvl,
  orNull,
  uuid,
} from '../../util';
import { Link } from '../link';
import { Menu } from '../menu';
import {
  IComponentsSettingsEntity,
  IconsEnum,
  IDefaultLayoutProps,
  IMenuItemEntity,
  INavigationListItemEntity,
  INavigationListProps,
  INavigationListState,
  LayoutModesEnum,
  NAVIGATION_EXTRA_ITEM_TYPES,
  NavigationItemTypesEnum,
  NavigationListClassesEnum,
} from '../../definition';
import { EntityIdT } from '../../definitions.interface';
import { EnhancedGenericComponent } from '../base/enhanced-generic.component';

export class NavigationList
  extends EnhancedGenericComponent<INavigationListProps, INavigationListState> {

  private readonly menuRef = React.createRef<Menu>();
  private readonly itemsRefsMap = new Map<EntityIdT, React.RefObject<HTMLDivElement>>();

  /**
   * @stable [23.03.2020]
   * @param {INavigationListProps} props
   */
  constructor(props: INavigationListProps) {
    super(props);

    this.asPopupMenuAnchorElement = this.asPopupMenuAnchorElement.bind(this);
    this.onPopupMenuItemSelect = this.onPopupMenuItemSelect.bind(this);

    this.state = {};
  }

  /**
   * @stable [24.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    this.itemsRefsMap.clear();

    const items = this.props.items;
    return (
      <nav
        ref={this.actualRef}
        className={NavigationListClassesEnum.NAVIGATION_LIST}
      >
        {this.getListDividerElement()}
        {items.map(this.toElement, this)}
        {
          ifNotNilThanValue(
            this.state.activeGroup,
            (activeGroup) => (
              <Menu
                positionConfiguration={{
                  collision: 'fit',
                  my: 'left top',
                  at: 'right top',
                }}
                heightRestricted={false}
                ref={this.menuRef}
                options={notNilValuesArrayFilter(...items.map((item) => this.asPopupMenuItem(item, activeGroup)))
                  .map((itm) => ({value: this.asUniqueKey(itm.link, 'link'), label: this.t(itm.label), rawData: itm}))}
                anchorElement={this.asPopupMenuAnchorElement}
                onSelect={this.onPopupMenuItemSelect}/>
            )
          )
        }
      </nav>
    );
  }

  /**
   * @stable [23.03.2020]
   */
  public componentWillUnmount(): void {
    this.itemsRefsMap.clear();

    super.componentWillUnmount();
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
   * @param {INavigationListItemEntity} item
   * @returns {JSX.Element}
   */
  private toElement(item: INavigationListItemEntity): JSX.Element {
    const isExpanded = this.isItemExpanded(item);
    const fullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);

    switch (item.type) {
      case NavigationItemTypesEnum.SUB_HEADER:
        const isGroupItemActive = !isExpanded && this.hasActiveChild(item);
        const groupRef = React.createRef<HTMLDivElement>();
        this.itemsRefsMap.set(item.value, groupRef);
        const ind = this.props.items.length - 1 -
          [...this.props.items].reverse().findIndex((itm) => itm.type === NavigationItemTypesEnum.SUB_HEADER);

        return (
          <div
            ref={groupRef}
            key={this.asUniqueKey(item.label, 'label')}
            className={joinClassName(
              this.asItemClasses(true, isGroupItemActive, isExpanded),
              ind === this.props.items.lastIndexOf(item) && !isExpanded && 'rac-navigation-list__last-section',
            )}
            title={label}
            onClick={() => this.onGroupClick(item)}
          >
            {this.uiFactory.makeIcon({
              type: item.icon || 'list',
            })}
            {fullLayoutModeEnabled && label}
            {fullLayoutModeEnabled && this.uiFactory.makeIcon({
              type: isExpanded ? IconsEnum.CHEVRON_UP : IconsEnum.CHEVRON_DOWN,
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
        return orNull(isGroup || fullLayoutModeEnabled && isExpanded, () => this.asItemElement(item));
    }
  }

  /**
   * @stable [12.02.2020]
   * @param {INavigationListItemEntity} item
   * @returns {JSX.Element}
   */
  private asItemElement(item: INavigationListItemEntity): JSX.Element {
    const isFullLayoutModeEnabled = this.isFullLayoutModeEnabled;
    const label = this.t(item.label);
    const isGroup = R.isNil(item.parent);
    const isExpanded = this.isItemExpanded(item);

    return (
      <Link
        to={item.link}
        key={this.asUniqueKey(item.link, 'link')}
        className={this.asItemClasses(isGroup, item.active, isExpanded)}
        title={label}
      >
        {this.uiFactory.makeIcon({
          type: item.icon,
          className: NavigationListClassesEnum.NAVIGATION_LIST_ITEM_ICON,
        })}
        {isFullLayoutModeEnabled && label}
      </Link>
    );
  }

  /**
   * @stable [23.03.2020]
   * @param {IMenuItemEntity<INavigationListItemEntity>} option
   */
  private onPopupMenuItemSelect(option: IMenuItemEntity<INavigationListItemEntity>): void {
    this.setState({activeGroup: null}, () =>
      ifNotNilThanValue(this.props.onClick, (onClick) => onClick(option.rawData)));
  }

  /**
   * @stable [24.03.2020]
   * @param {INavigationListItemEntity} entity
   */
  private onGroupClick(entity: INavigationListItemEntity): void {
    ifNotNilThanValue(this.props.onGroupClick, (onGroupClick) => onGroupClick(entity));

    if (!this.isFullLayoutModeEnabled) {
      this.setState({activeGroup: entity}, () => this.menuRef.current.show());
    }
  }

  /**
   * @stable [23.09.2018]
   * @param {INavigationListItemEntity} item
   * @returns {boolean}
   */
  private isItemExpanded(item: INavigationListItemEntity): boolean {
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

  // TODO
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
   * @param {INavigationListItemEntity} item
   * @returns {boolean}
   */
  private hasActiveChild(item: INavigationListItemEntity): boolean {
    const activeItem = R.find((itm) => !!itm.active, this.props.items);
    return !R.isNil(activeItem) && !R.isNil(R.find((child) => child.link === activeItem.link, item.children || []));
  }

  /**
   * @stable [24.03.2020]
   * @param {INavigationListItemEntity} item
   * @param {INavigationListItemEntity} activeGroup
   * @returns {INavigationListItemEntity}
   */
  private asPopupMenuItem(item: INavigationListItemEntity, activeGroup: INavigationListItemEntity): INavigationListItemEntity {
    if (NAVIGATION_EXTRA_ITEM_TYPES.includes(item.type)) {
      return null;
    }
    return ifNotNilThanValue(item.parent, (parent) => orNull(parent.value === activeGroup.value, item));
  }

  /**
   * @stable [24.03.2020]
   * @returns {HTMLElement}
   */
  private asPopupMenuAnchorElement(): HTMLElement {
    return this.itemsRefsMap.get(this.state.activeGroup.value).current;
  }

  /**
   * @stable [23.03.2020]
   * @param {boolean} isGroup
   * @param {boolean} isActive
   * @param {boolean} isExpanded
   * @returns {string}
   */
  private asItemClasses(isGroup: boolean,
                        isActive: boolean,
                        isExpanded: boolean): string {
    return (
      joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST_SECTION,
        isGroup
          ? NavigationListClassesEnum.NAVIGATION_LIST_GROUP_SECTION
          : NavigationListClassesEnum.NAVIGATION_LIST_ITEM_SECTION,
        isActive
          ? NavigationListClassesEnum.NAVIGATION_LIST_ACTIVE_SECTION
          : (isExpanded ? NavigationListClassesEnum.NAVIGATION_LIST_EXPANDED_SECTION : ''),
      )
    );
  }

  /**
   * @stable [23.03.2020]
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private asUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }
}
