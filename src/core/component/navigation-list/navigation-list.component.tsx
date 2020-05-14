import * as React from 'react';
import * as R from 'ramda';

import {
  ifNotFalseThanValue,
  ifNotNilThanValue,
  isFull,
  joinClassName,
  mergeWithSystemProps,
  notNilValuesArrayFilter,
  orNull,
  uuid,
} from '../../util';
import { Link } from '../link';
import { Menu } from '../menu';
import {
  IconsEnum,
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

    const $mergedProps = this.mergedProps;
    const items = $mergedProps.items;

    return (
      <nav
        ref={this.actualRef}
        className={this.asClassName($mergedProps)}
      >
        {this.getListDividerElement()}
        {items.map((item) => this.toElement(item, $mergedProps))}
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

  private toElement(item: INavigationListItemEntity,
                    $mergedProps: INavigationListProps): JSX.Element {
    const $isExpanded = this.isItemExpanded(item);
    const $isFullModeEnabled = this.isFullLayoutModeEnabled(this.mergedProps);
    const label = this.t(item.label);
    const $isGroup = R.isNil(item.parent);

    switch (item.type) {
      case NavigationItemTypesEnum.SUB_HEADER:
        const isGroupItemActive = !$isExpanded && this.hasActiveChild(item);
        const groupRef = React.createRef<HTMLDivElement>();
        this.itemsRefsMap.set(item.value, groupRef);
        const ind = this.props.items.length - 1 -
          [...this.props.items].reverse().findIndex((itm) => itm.type === NavigationItemTypesEnum.SUB_HEADER);

        return (
          <div
            ref={groupRef}
            key={this.asUniqueKey(item.label, 'label')}
            className={joinClassName(
              this.asItemClassName(true, isGroupItemActive, $isExpanded),
              ind === this.props.items.lastIndexOf(item) && !$isExpanded && 'rac-navigation-list__last-section',
            )}
            title={label}
            onClick={() => this.onGroupClick(item)}
          >
            {this.asItemIconElement(item)}
            {$isFullModeEnabled && label}
            {$isFullModeEnabled && this.uiFactory.makeIcon({
              type: $isExpanded ? IconsEnum.CHEVRON_UP : IconsEnum.CHEVRON_DOWN,
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
        return orNull(
          $isGroup || $isFullModeEnabled && $isExpanded,
          () => this.asItemElement(item, $isGroup, $isFullModeEnabled, $isExpanded)
        );
    }
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

    if (!this.isFullLayoutModeEnabled(this.mergedProps)) {
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
   * @stable [14.05.2020]
   * @param {INavigationListItemEntity} item
   * @param {boolean} $isGroup
   * @param {boolean} $isFullModeEnabled
   * @param {boolean} $isExpanded
   * @returns {JSX.Element}
   */
  private asItemElement(item: INavigationListItemEntity,
                        $isGroup: boolean,
                        $isFullModeEnabled: boolean,
                        $isExpanded: boolean): JSX.Element {
    const $label = this.t(item.label);

    return (
      <Link
        to={item.link}
        key={this.asUniqueKey(item.link, 'link')}
        className={this.asItemClassName($isGroup, item.active, $isExpanded)}
        title={$label}
      >
        {this.asItemIconElement(item)}
        {$isFullModeEnabled && $label}
      </Link>
    );
  }

  /**
   * @stable [14.05.2020]
   * @param {INavigationListItemEntity} item
   * @param {string} extraClassName
   * @returns {JSX.Element}
   */
  private asItemIconElement(item: INavigationListItemEntity, extraClassName?: string): JSX.Element {
    return this.uiFactory.makeIcon({
      type: item.icon || IconsEnum.LIST_UL,
      className: joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST_SECTION_ICON,
        extraClassName
      ),
    });
  }

  /**
   * @stable [14.05.2020]
   * @returns {HTMLElement}
   */
  private asPopupMenuAnchorElement(): HTMLElement {
    return this.itemsRefsMap.get(this.state.activeGroup.value).current;
  }

  /**
   * @stable [14.05.2020]
   * @param {boolean} $isGroup
   * @param {boolean} $isActive
   * @param {boolean} $isExpanded
   * @returns {string}
   */
  private asItemClassName($isGroup: boolean,
                          $isActive: boolean,
                          $isExpanded: boolean): string {
    return (
      joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST_SECTION,
        $isGroup
          ? NavigationListClassesEnum.NAVIGATION_LIST_GROUP_SECTION
          : NavigationListClassesEnum.NAVIGATION_LIST_ITEM_SECTION,
        $isActive
          ? NavigationListClassesEnum.NAVIGATION_LIST_ACTIVE_SECTION
          : ($isExpanded ? NavigationListClassesEnum.NAVIGATION_LIST_EXPANDED_SECTION : ''),
      )
    );
  }

  /**
   * @stable [14.05.2020]
   * @param {INavigationListProps} $mergedProps
   * @returns {string}
   */
  private asClassName($mergedProps: INavigationListProps): string {
    return (
      joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST,
        !this.isFullLayoutModeEnabled($mergedProps) && NavigationListClassesEnum.MINI_NAVIGATION_LIST,
        isFull($mergedProps) && NavigationListClassesEnum.FULL_NAVIGATION_LIST,
      )
    );
  }

  /**
   * @stable [14.05.2020]
   * @param {INavigationListProps} $mergedProps
   * @returns {boolean}
   */
  private isFullLayoutModeEnabled($mergedProps: INavigationListProps): boolean {
    return $mergedProps.mode === LayoutModesEnum.FULL;
  }

  /**
   * @stable [14.05.2020]
   * @returns {INavigationListProps}
   */
  private get mergedProps(): INavigationListProps {
    return mergeWithSystemProps(this.props, this.settings.components.navigationList);
  }

  /**
   * @stable [14.05.2020]
   * @param {string} link
   * @param {string} prefix
   * @returns {string}
   */
  private asUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }
}
