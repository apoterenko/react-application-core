import * as React from 'react';

import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IContentWrapper,
  IHeaderConfigurationWrapper,
  IMenuActionConfigurationWrapper,
  INavigationActionConfigurationWrapper,
  INavigationActionRenderedWrapper,
  IOnCommentClickWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IPresetsMenuItemEntity,
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
    IOnCommentClickWrapper,
    IOnSelectWrapper<IPresetsMenuItemEntity> {
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
  ACTIONS = 'rac-header__actions',
  CHAT_ACTION = 'rac-header__chat-action',
  CONTENT = 'rac-header__content',
  HEADER = 'rac-header',
  HELP_ACTION = 'rac-header__help-action',
  HELP_ACTION_WRAPPER = 'rac-header__help-action-wrapper',
  MENU_ACTION = 'rac-header__menu-action',
  NAVIGATION_ACTION = 'rac-header__navigation-action',
  USER_AVATAR = 'rac-header__user-avatar',
  USER_INFO = 'rac-header__user-info',
}
