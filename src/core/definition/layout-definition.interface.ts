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
  ITopTitleWrapper,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import { IGenericStoreEntity } from './redux-definition.interface';
import { IHeaderConfigurationEntity } from './header-definition.interface';

/**
 * @enum
 * @stable [28.09.2019]
 */
export enum LayoutModesEnum {
  FULL,
  MINIMAL,
}

/**
 * @generic-entity
 * @stable [28.09.2019]
 */
export interface IGenericLayoutEntity
  extends IExpandedGroupsWrapper<{}>,
    IModeWrapper<LayoutModesEnum>,
    IXYEntity {
}

/**
 * @wrapper-entity
 * @stable [28.09.2019]
 */
export interface ILayoutWrapperEntity<TEntity = IGenericLayoutEntity>
  extends ILayoutWrapper<TEntity> {
}

/**
 * @generic-entity
 * @stable [04.02.2020]
 */
export interface IGenericDefaultLayoutEntity
  extends IDrawerHeaderRenderedWrapper,
    IFooterWrapper,
    IGenericStoreEntity,
    IHeaderConfigurationEntity,
    IHeaderContentWrapper,
    IHeaderWrapper,
    ILayoutModeWrapper<LayoutModesEnum>,
    ILayoutWrapperEntity {
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
 * @generic-entity
 * @stable [13.02.2020]
 */
export interface IGenericFormLayoutEntity
  extends ITopTitleWrapper {
}

/**
 * @props
 * @stable [13.02.2020]
 */
export interface IFormLayoutProps
  extends IComponentProps,
    IGenericFormLayoutEntity {
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
export const INITIAL_LAYOUT_ENTITY = Object.freeze<IGenericLayoutEntity>({
  x: 0,
  y: 0,
  mode: LayoutModesEnum.FULL,
  expandedGroups: {[LayoutGroupsValuesEnum.HOME]: true},
});
