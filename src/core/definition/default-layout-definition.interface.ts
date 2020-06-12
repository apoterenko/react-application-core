import {
  IDefaultLayoutConfigurationWrapper,
  IDrawerHeaderLogoRenderedWrapper,
  IDrawerHeaderRenderedWrapper,
  IFooterRenderedWrapper,
  IFooterWrapper,
  IHeaderRenderedWrapper,
  IHeaderWrapper,
  IOnChangeLayoutModeWrapper,
  IOnDrawerHeaderClickWrapper,
  IProgressWrapper,
  ISubHeaderRenderedWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IHeaderConfigurationEntity } from './header-definition.interface';
import { IMainConfigurationEntity } from './main-definition.interface';
import { IReduxStoreEntity } from './redux-definition.interface';
import { ISubHeaderConfigurationEntity } from './sub-header-definition.interface';

/**
 * @presets-entity
 * @stable [27.05.2020]
 */
export interface IPresetsDefaultLayoutEntity
  extends IDrawerHeaderLogoRenderedWrapper,
    IDrawerHeaderRenderedWrapper,
    IFooterRenderedWrapper,
    IFooterWrapper,
    IHeaderConfigurationEntity,
    IHeaderRenderedWrapper,
    IHeaderWrapper,
    IMainConfigurationEntity,
    IOnChangeLayoutModeWrapper,
    IOnDrawerHeaderClickWrapper,
    IProgressWrapper,             /* Not a redux-property (!) because of "react state" */
    ISubHeaderConfigurationEntity,
    ISubHeaderRenderedWrapper {
}

/**
 * @redux-entity
 * @stable [27.05.2020]
 */
export interface IReduxDefaultLayoutEntity
  extends IReduxStoreEntity {
}

/**
 * @generic-entity
 * @stable [27.05.2020]
 */
export interface IGenericDefaultLayoutEntity
  extends IPresetsDefaultLayoutEntity,
    IReduxDefaultLayoutEntity {
}

/**
 * @props
 * @stable [04.02.2020]
 */
export interface IDefaultLayoutProps
  extends IGenericComponentProps,
    IGenericDefaultLayoutEntity {
  navigationListElement?: any; // TODO
}

/**
 * @configuration-entity
 * @stable [22.05.2020]
 */
export interface IDefaultLayoutConfigurationEntity<TProps = IDefaultLayoutProps>
  extends IDefaultLayoutConfigurationWrapper<TProps> {
}

/**
 * @presets-entity
 * @stable [12.06.2020]
 */
export interface IPresetsDefaultLayoutContainerEntity
  extends IDefaultLayoutConfigurationEntity,
    IHeaderConfigurationEntity,
    ISubHeaderConfigurationEntity {
}

/**
 * @generic-entity
 * @stable [12.06.2020]
 */
export interface IGenericDefaultLayoutContainerEntity
  extends IPresetsDefaultLayoutContainerEntity {
}

/**
 * @props
 * @stable [12.06.2020]
 */
export interface IDefaultLayoutContainerProps
  extends IGenericContainerProps,
    IGenericDefaultLayoutContainerEntity {
}

/**
 * @classes
 * @stable [20.05.2020]
 */
export enum DefaultLayoutClassesEnum {
  DEFAULT_LAYOUT = 'rac-default-layout',
  DEFAULT_LAYOUT_BODY = 'rac-default-layout__body',
  DEFAULT_LAYOUT_DRAWER_HEADER = 'rac-default-layout__drawer-header',
  DEFAULT_LAYOUT_DRAWER_HEADER_LOGO = 'rac-default-layout__drawer-header-logo',
  DEFAULT_LAYOUT_DRAWER_HEADER_MENU_ACTION = 'rac-default-layout__drawer-header-menu-action',
  DEFAULT_LAYOUT_DRAWER_HEADER_VERSION = 'rac-default-layout__drawer-header-version',
  DEFAULT_LAYOUT_FULL = 'rac-default-layout-full',
  DEFAULT_LAYOUT_MINI = 'rac-default-layout-mini',
}
