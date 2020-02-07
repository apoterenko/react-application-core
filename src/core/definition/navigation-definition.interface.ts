import {
  IAccessConfigurationWrapper,
  IActiveWrapper,
  IChildrenWrapper,
  IIconWrapper,
  ILabelWrapper,
  ILinkWrapper,
  IParentWrapper,
  IRelatedLinksWrapper,
  ITypeWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @stable [11.09.2019]
 */
export enum NavigationItemTypesEnum {
  DIVIDER,
  GROUP,
  SUB_HEADER,
}

/**
 * @stable [11.09.2019]
 */
export interface INavigationItemEntity<TAccessConfiguration = {}>
  extends IAccessConfigurationWrapper<TAccessConfiguration>,
    IActiveWrapper,
    IChildrenWrapper<INavigationItemEntity[]>,
    IIconWrapper,
    ILabelWrapper,
    ILinkWrapper,
    IParentWrapper<INavigationItemEntity>,
    IRelatedLinksWrapper<string[]>,
    ITypeWrapper<NavigationItemTypesEnum>,
    IValueWrapper {
}
