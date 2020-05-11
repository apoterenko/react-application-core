import { IReduxXYEntity } from './xy-definition.interface';
import {
  IDrawerHeaderRenderedWrapper,
  IExpandedGroupsWrapper,
  IFooterWrapper,
  IHeaderContentWrapper,
  IHeaderWrapper,
  ILayoutModeWrapper,
  ILayoutWrapper,
  IModeWrapper,
  IOnDrawerHeaderClickWrapper,
  IProgressWrapper,
  ITopTitleWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericStoreEntity } from './redux-definition.interface';
import { IHeaderConfigurationEntity } from './header-definition.interface';

/**
 * @enum
 * @stable [08.05.2020]
 */
export enum LayoutModesEnum {
  FULL,
  MINIMAL,
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxLayoutEntity
  extends IExpandedGroupsWrapper<{}>,
    IModeWrapper<LayoutModesEnum>,
    IReduxXYEntity {
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface ILayoutEntity
  extends ILayoutWrapper<IReduxLayoutEntity> {
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
    ILayoutEntity,
    ILayoutModeWrapper<LayoutModesEnum>,
    IProgressWrapper {
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
  extends IGenericComponentProps,
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
  extends IGenericComponentProps,
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
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_LAYOUT_ENTITY = Object.freeze<IReduxLayoutEntity>({
  expandedGroups: {[LayoutGroupsValuesEnum.HOME]: true},
  mode: LayoutModesEnum.FULL,
  x: 0,
  y: 0,
});

/**
 * @classes
 * @stable [08.05.2020]
 */
export enum LayoutClassesEnum {
  FORM_LAYOUT = 'rac-form-layout',
  FORM_LAYOUT_CONTENT = 'rac-form-layout__content',
  FORM_LAYOUT_TOP_HEADER = 'rac-form-layout__top-header',
}
