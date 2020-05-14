import {
  IAccessConfigurationWrapper,
  IActiveGroupWrapper,
  IActiveWrapper,
  IChildrenWrapper,
  IDividerRenderedWrapper,
  IIconWrapper,
  IItemsWrapper,
  ILabelWrapper,
  ILinkWrapper,
  IOnClickWrapper,
  IOnGroupClickWrapper,
  IParentWrapper,
  IRelatedLinksWrapper,
  ITypeWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IBehavioralScrolledEntity } from './scrolled-definition.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import { IReduxLayoutEntity } from './layout-definition.interface';

/**
 * @stable [11.09.2019]
 */
export enum NavigationItemTypesEnum {
  DIVIDER,
  GROUP,
  SUB_HEADER,
}

/**
 * @stable [23.03.2020]
 */
export const NAVIGATION_EXTRA_ITEM_TYPES = [
  NavigationItemTypesEnum.DIVIDER,
  NavigationItemTypesEnum.SUB_HEADER
];

/**
 * @entity
 * @stable [11.09.2019]
 */
export interface INavigationListItemEntity<TAccessConfiguration = {}>
  extends IAccessConfigurationWrapper<TAccessConfiguration>,
    IActiveWrapper,
    IChildrenWrapper<INavigationListItemEntity[]>,
    IIconWrapper,
    ILabelWrapper,
    ILinkWrapper,
    IParentWrapper<INavigationListItemEntity>,
    IRelatedLinksWrapper<string[]>,
    ITypeWrapper<NavigationItemTypesEnum>,
    IValueWrapper {
}

/**
 * @generic-entity
 * @stable [24.03.2020]
 */
export interface IGenericNavigationListEntity
  extends IReduxLayoutEntity,
    IDividerRenderedWrapper,
    IItemsWrapper<INavigationListItemEntity[]> {
}

/**
 * @behavioral-entity
 * @stable [24.03.2020]
 */
export interface IBehavioralNavigationListEntity
  extends IBehavioralScrolledEntity,
    IOnClickWrapper<INavigationListItemEntity>,
    IOnGroupClickWrapper<INavigationListItemEntity> {
}

/**
 * @props
 * @stable [24.03.2020]
 */
export interface INavigationListProps
  extends IEnhancedGenericComponentProps,
    IGenericNavigationListEntity,
    IBehavioralNavigationListEntity {
}

/**
 * @state
 * @stable [24.03.2020]
 */
export interface INavigationListState
  extends IActiveGroupWrapper<INavigationListItemEntity> {
}

/**
 * @classes
 * @stable [24.03.2020]
 */
export enum NavigationListClassesEnum {
  NAVIGATION_LIST = 'rac-navigation-list',
  NAVIGATION_LIST_ACTIVE_SECTION = 'rac-navigation-list__active-section',
  NAVIGATION_LIST_EXPANDED_SECTION = 'rac-navigation-list__expanded-section',
  NAVIGATION_LIST_GROUP_SECTION = 'rac-navigation-list__group-section',
  NAVIGATION_LIST_ITEM_ICON = 'rac-navigation-list__item-icon',
  NAVIGATION_LIST_ITEM_SECTION = 'rac-navigation-list__item-section',
  NAVIGATION_LIST_SECTION = 'rac-navigation-list__section',
}
