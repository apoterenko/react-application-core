import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  WrapperUtils,
} from '../../util';
import { Link } from '../link';
import { Menu } from '../menu';
import {
  IconsEnum,
  INavigationListItemEntity,
  INavigationListProps,
  INavigationListState,
  IPresetsMenuItemEntity,
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
   * @stable [14.05.2020]
   * @param {INavigationListProps} props
   */
  constructor(props: INavigationListProps) {
    super(props);

    this.asPopupMenuAnchorElement = this.asPopupMenuAnchorElement.bind(this);
    this.onPopupMenuItemSelect = this.onPopupMenuItemSelect.bind(this);

    this.state = {};
  }

  /**
   * @stable [14.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    this.itemsRefsMap.clear();

    const {activeGroup} = this.state;
    const $mergedProps = this.mergedProps;
    const $items = $mergedProps.items;

    return (
      <nav
        ref={this.actualRef}
        className={this.asClassName($mergedProps)}
      >
        {$items.map((item) => this.toElement(item, $mergedProps))}
        {ConditionUtils.ifNotNilThanValue(activeGroup, () => this.asPopupMenuElement($items, activeGroup))}
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

  private toElement(item: INavigationListItemEntity,
                    $mergedProps: INavigationListProps): JSX.Element {
    const $isExpanded = this.isItemExpanded(item);
    const $isFullModeEnabled = this.isFullLayoutModeEnabled(this.mergedProps);
    const $label = this.asItemLabel(item);
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
            key={this.asUniqueKey(this.asItemLabel(item), 'label')}
            className={ClsUtils.joinClassName(
              this.asItemClassName(true, isGroupItemActive, $isExpanded),
              ind === this.props.items.lastIndexOf(item) && !$isExpanded && 'rac-navigation-list__last-section',
            )}
            title={$label}
            onClick={() => this.onGroupClick(item, $mergedProps, $isFullModeEnabled)}
          >
            {this.asItemIconElement(item)}
            {
              $isFullModeEnabled && (
                <React.Fragment>
                  {$label}
                  {this.asItemExpandIconElement($isExpanded)}
                </React.Fragment>
              )
            }
          </div>
        );
      default:
        return ConditionUtils.orNull(
          $isGroup || $isFullModeEnabled && $isExpanded,
          () => this.asItemElement(item, $isGroup, $isFullModeEnabled, $isExpanded)
        );
    }
  }

  /**
   * @stable [14.05.2020]
   * @param {IPresetsMenuItemEntity<INavigationListItemEntity>} option
   */
  private onPopupMenuItemSelect(option: IPresetsMenuItemEntity<INavigationListItemEntity>): void {
    this.setState(
      {activeGroup: null},
      () => ConditionUtils.ifNotNilThanValue(this.props.onClick, (onClick) => onClick(option.rawData))
    );
  }

  /**
   * @stable [14.05.2020]
   * @param {INavigationListItemEntity} $entity
   * @param {boolean} $isFullModeEnabled
   * @param {INavigationListProps} $mergedProps
   */
  private onGroupClick($entity: INavigationListItemEntity,
                       $mergedProps: INavigationListProps,
                       $isFullModeEnabled: boolean): void {
    if ($isFullModeEnabled) {
      ConditionUtils.ifNotNilThanValue($mergedProps.onGroupClick, (onGroupClick) => onGroupClick($entity));
    } else {
      this.setState({activeGroup: $entity}, () => this.menuRef.current.show());
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
    return ConditionUtils.ifNotNilThanValue(
      item.parent,
      (parent) => ConditionUtils.orNull(parent.value === activeGroup.value, item)
    );
  }

  private asPopupMenuElement($items: INavigationListItemEntity[],
                             $activeGroup: INavigationListItemEntity): JSX.Element {
    return (
      <Menu
        ref={this.menuRef}
        positionConfiguration={{
          collision: 'fit',
          my: 'left top',
          at: 'right top',
        }}
        heightRestricted={false}
        options={FilterUtils.notNilValuesArrayFilter(...$items.map((item) => this.asPopupMenuItem(item, $activeGroup)))
          .map((itm) => ({value: this.asUniqueKey(itm.link, 'link'), label: this.asItemLabel(itm), rawData: itm}))}
        anchorElement={this.asPopupMenuAnchorElement}
        onSelect={this.onPopupMenuItemSelect}/>
    );
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
    const $label = this.asItemLabel(item);

    return (
      <Link
        to={item.link}
        key={this.asUniqueKey(item.link, 'link')}
        className={this.asItemClassName($isGroup, item.active, $isExpanded)}
        title={$label}
      >
        {this.asItemIconElement(item, !$isGroup && NavigationListClassesEnum.NAVIGATION_LIST_ITEM_SECTION_ICON)}
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
      className: ClsUtils.joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST_SECTION_ICON,
        extraClassName
      ),
    });
  }

  /**
   * @stable [14.05.2020]
   * @param {boolean} $isExpanded
   * @returns {JSX.Element}
   */
  private asItemExpandIconElement($isExpanded: boolean): JSX.Element {
    return this.uiFactory.makeIcon({
      type: $isExpanded ? IconsEnum.CHEVRON_UP : IconsEnum.CHEVRON_DOWN,
      className: NavigationListClassesEnum.NAVIGATION_LIST_EXPAND_ICON,
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
      ClsUtils.joinClassName(
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
      ClsUtils.joinClassName(
        NavigationListClassesEnum.NAVIGATION_LIST,
        !this.isFullLayoutModeEnabled($mergedProps) && NavigationListClassesEnum.MINI_NAVIGATION_LIST,
        WrapperUtils.isFull($mergedProps) && NavigationListClassesEnum.FULL_NAVIGATION_LIST,
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
   * @stable [06.10.2020]
   * @param item
   */
  private asItemLabel(item: INavigationListItemEntity): string {
    return ConditionUtils.ifNotNilThanValue(item.label, (label) => this.t(CalcUtils.calc(label)));
  }

  /**
   * @stable [06.10.2020]
   * @param link
   * @param prefix
   */
  private asUniqueKey(link: string, prefix: string): string {
    return `navigation-list-key-${link}-${prefix}`;
  }

  /**
   * @stable [06.10.2020]
   */
  protected get componentsSettingsProps(): INavigationListProps {
    return this.componentsSettings.navigationList;
  }
}
