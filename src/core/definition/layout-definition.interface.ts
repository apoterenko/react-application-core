import { IReduxXYEntity } from './xy-definition.interface';
import {
  IDrawerHeaderRenderedWrapper,
  IExpandedGroupsWrapper,
  IFooterRenderedWrapper,
  IFooterWrapper,
  IHeaderContentWrapper,
  IHeaderRenderedWrapper,
  IHeaderWrapper,
  ILayoutWrapper,
  IModeWrapper,
  IOnDrawerHeaderClickWrapper,
  IProgressWrapper,
  ISubHeaderRenderedWrapper,
  ITopTitleWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericStoreEntity } from './redux-definition.interface';
import { IHeaderConfigurationEntity } from './header-definition.interface';
import { ISubHeaderConfigurationEntity } from './sub-header-definition.interface';

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
 * @redux-holder-entity
 * @stable [21.05.2020]
 */
export interface IReduxHolderLayoutEntity<TEntity = IReduxLayoutEntity>
  extends ILayoutWrapper<TEntity> {
}

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsDefaultLayoutEntity
  extends IFooterRenderedWrapper,
    IFooterWrapper,
    IHeaderConfigurationEntity,
    IHeaderRenderedWrapper,
    IHeaderWrapper,
    IOnDrawerHeaderClickWrapper<LayoutModesEnum>,
    ISubHeaderConfigurationEntity,
    ISubHeaderRenderedWrapper {
}

/**
 * @generic-entity
 * @stable [04.02.2020]
 */
export interface IGenericDefaultLayoutEntity
  extends IPresetsDefaultLayoutEntity,
    IDrawerHeaderRenderedWrapper,
    IGenericStoreEntity,
    IHeaderContentWrapper,
    IReduxHolderLayoutEntity,
    IProgressWrapper {
}

/**
 * @props
 * @stable [04.02.2020]
 */
export interface IDefaultLayoutProps
  extends IGenericComponentProps,
    IGenericDefaultLayoutEntity {
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

/**
 * @classes
 * @stable [20.05.2020]
 */
export enum DefaultLayoutClassesEnum {
  DEFAULT_LAYOUT = 'rac-default-layout',
  DEFAULT_LAYOUT_BODY = 'rac-default-layout__body',
  DEFAULT_LAYOUT_DRAWER_HEADER = 'rac-default-layout__drawer-header',
  DEFAULT_LAYOUT_FULL = 'rac-default-layout-full',
  DEFAULT_LAYOUT_MINI = 'rac-default-layout-mini',
  DEFAULT_LAYOUT_WITH_SUB_HEADER = 'rac-default-layout-with-sub-header',
  DEFAULT_LAYOUT_WITHOUT_SUB_HEADER = 'rac-default-layout-without-sub-header',
}
