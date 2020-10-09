import * as React from 'react';

import {
  IChatDialogContentWrapper,
  IDefaultLayoutConfigurationWrapper,
  IDefaultLayoutPropsWrapper,
  IDrawerHeaderLogoRenderedWrapper,
  IDrawerHeaderRenderedWrapper,
  IFooterRenderedWrapper,
  IFooterWrapper,
  IHeaderRenderedWrapper,
  IHeaderWrapper,
  IOnChangeLayoutModeWrapper,
  IOnCloseWrapper,
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
 * @config-entity
 * @stable [09.10.2020]
 */
export interface IDefaultLayoutChatConfigEntity<TProps extends IPresetsDefaultLayoutEntity<{}> = IPresetsDefaultLayoutEntity<{}>>
  extends IDefaultLayoutPropsWrapper<TProps>,
    IOnCloseWrapper {
}

/**
 * @presets-entity
 * @stable [27.05.2020]
 */
export interface IPresetsDefaultLayoutEntity<TProps extends IPresetsDefaultLayoutEntity<{}> = IPresetsDefaultLayoutEntity<{}>>
  extends IChatDialogContentWrapper<(cfg: IDefaultLayoutChatConfigEntity<TProps>) => React.ReactNode>,
    IDrawerHeaderLogoRenderedWrapper,
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
export interface IGenericDefaultLayoutEntity<TProps extends IGenericDefaultLayoutEntity<{}> = IGenericDefaultLayoutEntity<{}>>
  extends IPresetsDefaultLayoutEntity<TProps>,
    IReduxDefaultLayoutEntity {
}

/**
 * @props
 * @stable [04.02.2020]
 */
export interface IDefaultLayoutProps<TProps extends IDefaultLayoutProps<{}> = IDefaultLayoutProps<{}>>
  extends IGenericComponentProps,
    IGenericDefaultLayoutEntity<TProps> {
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
  CHAT_DIALOG = 'rac-default-layout__chat-dialog',
  DEFAULT_LAYOUT = 'rac-default-layout',
  DEFAULT_LAYOUT_BODY = 'rac-default-layout__body',
  DEFAULT_LAYOUT_DRAWER_HEADER = 'rac-default-layout__drawer-header',
  DEFAULT_LAYOUT_DRAWER_HEADER_LOGO = 'rac-default-layout__drawer-header-logo',
  DEFAULT_LAYOUT_DRAWER_HEADER_MENU_ACTION = 'rac-default-layout__drawer-header-menu-action',
  DEFAULT_LAYOUT_DRAWER_HEADER_VERSION = 'rac-default-layout__drawer-header-version',
  DEFAULT_LAYOUT_FULL = 'rac-default-layout-full',
  DEFAULT_LAYOUT_MINI = 'rac-default-layout-mini',
}
