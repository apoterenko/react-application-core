import * as React from 'react';

import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IContentWrapper,
  IHeaderConfigurationWrapper,
  IMenuActionConfigurationWrapper,
  INavigationActionConfigurationWrapper,
  INavigationActionRenderedWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';
import { IButtonProps } from './button-definition.interface';
import { IReduxStoreEntity } from './redux-definition.interface';

/**
 * @enum
 * @stable [06.02.2020]
 */
export enum HeaderUserMenuActionsEnum {
  EXIT,
  PROFILE,
}

/**
 * @redux-entity
 * @stable [22.05.2020]
 */
export interface IReduxHeaderEntity
  extends IReduxStoreEntity {
}

/**
 * @presets-entity
 * @stable [21.05.2020]
 */
export interface IPresetsHeaderEntity
  extends IContentWrapper<React.ReactNode | (() => React.ReactNode)>,
    IMenuActionConfigurationWrapper<IButtonProps>,
    IMenuConfigurationEntity,
    INavigationActionConfigurationWrapper<IButtonProps>,
    INavigationActionRenderedWrapper,
    IOnSelectWrapper<IMenuItemEntity> {
}

/**
 * @generic-entity
 * @stable [06.02.2020]
 */
export interface IGenericHeaderEntity
  extends IPresetsHeaderEntity,
    IReduxHeaderEntity {
}

/**
 * @props
 * @stable [21.05.2020]
 */
export interface IHeaderProps
  extends IGenericComponentProps,
    IGenericHeaderEntity {
}

/**
 * @configuration-entity
 * @stable [04.01.2020]
 */
export interface IHeaderConfigurationEntity
  extends IHeaderConfigurationWrapper<IHeaderProps> {
}

/**
 * @classes
 * @stable [24.03.2020]
 */
export enum HeaderClassesEnum {
  HEADER = 'rac-header',
  HEADER_ACTIONS = 'rac-header__actions',
  HEADER_CONTENT = 'rac-header__content',
  HEADER_MENU_ACTION = 'rac-header__menu-action',
  HEADER_NAVIGATION_ACTION = 'rac-header__navigation-action',
  HEADER_USER_AVATAR = 'rac-header__user-avatar',
  HEADER_USER_INFO = 'rac-header__user-info',
}
