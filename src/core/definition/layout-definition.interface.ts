import { IXYEntity } from './xy-definition.interface';
import {
  IDrawerHeaderRenderedWrapper,
  IExpandedGroupsWrapper,
  IFooterWrapper,
  IHeaderContentWrapper,
  IHeaderWrapper,
  IKeyValue,
  ILayoutModeWrapper,
  ILayoutWrapper,
  IModeWrapper,
  IOnDrawerHeaderClickWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import { IHeaderConfigurationEntity } from './header-definition.interface';
import { IUserWrapperEntity } from './user-definition.interface';

/**
 * @enum
 * @stable [28.09.2019]
 */
export enum LayoutModesEnum {
  FULL,
  MINIMAL,
}

/**
 * @entity
 * @stable [28.09.2019]
 */
export interface ILayoutEntity
  extends IExpandedGroupsWrapper<IKeyValue>,
    IModeWrapper<LayoutModesEnum>,
    IXYEntity {
}

/**
 * @wrapper-entity
 * @stable [28.09.2019]
 */
export interface ILayoutWrapperEntity
  extends ILayoutWrapper<ILayoutEntity> {
}

/**
 * @generic-entity
 * @stable [04.02.2020]
 */
export interface IGenericDefaultLayoutEntity
  extends IDrawerHeaderRenderedWrapper,
    IFooterWrapper,
    IHeaderConfigurationEntity,
    IHeaderContentWrapper,
    IHeaderWrapper<JSX.Element | boolean>,
    ILayoutModeWrapper<LayoutModesEnum>,
    ILayoutWrapperEntity,
    IUserWrapperEntity {
}

/**
 * @behavioral-entity
 * @stable [04.02.2020]
 */
export interface IBehavioralDefaultLayoutEntity
  extends IOnDrawerHeaderClickWrapper<LayoutModesEnum> {
}

/**
 * @props
 * @stable [04.02.2020]
 */
export interface IDefaultLayoutProps
  extends IComponentProps,
    IGenericDefaultLayoutEntity,
    IBehavioralDefaultLayoutEntity {
  navigationListElement?: any;
  onLogoMenuActionClick?: any;
}

/**
 * @enum
 * @stable [28.09.2019]
 */
export enum LayoutGroupsValuesEnum {
  HOME = 'home',
}

/**
 * @initial-entity
 * @stable [28.09.2019]
 */
export const INITIAL_LAYOUT_ENTITY = Object.freeze<ILayoutEntity>({
  x: 0,
  y: 0,
  mode: LayoutModesEnum.FULL,
  expandedGroups: {[LayoutGroupsValuesEnum.HOME]: true},
});
