import * as React from 'react';

import { IComponentProps } from './props-definition.interface';
import {
  IBackActionConfigurationWrapper,
  IBackActionRenderedWrapper,
  IContentWrapper,
  IHeaderConfigurationWrapper,
  IMenuActionConfigurationWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';
import { IButtonProps } from './button-definition.interface';
import { IGenericStoreEntity } from './redux-definition.interface';

/**
 * @enum
 * @stable [06.02.2020]
 */
export enum HeaderUserMenuActionsEnum {
  EXIT,
  PROFILE,
}

/**
 * @generic-entity
 * @stable [06.02.2020]
 */
export interface IGenericHeaderEntity
  extends IBackActionConfigurationWrapper<IButtonProps>,
    IBackActionRenderedWrapper,
    IContentWrapper<React.ReactNode | (() => React.ReactNode)>,
    IGenericStoreEntity,
    IMenuActionConfigurationWrapper<IButtonProps>,
    IMenuConfigurationEntity {
}

/**
 * @behavioral-entity
 * @stable [06.02.2020]
 */
export interface IBehavioralHeaderEntity
  extends IOnSelectWrapper<IMenuItemEntity> {
}

/**
 * @props
 * @stable [06.02.2020]
 */
export interface IHeaderProps
  extends IComponentProps,
    IGenericHeaderEntity,
    IBehavioralHeaderEntity {
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
  HEADER_BACK_ACTION = 'rac-header__back-action',
  HEADER_CONTENT = 'rac-header__content',
  HEADER_MENU_ACTION = 'rac-header__menu-action',
  HEADER_USER_AVATAR = 'rac-header__user-avatar',
  HEADER_USER_INFO = 'rac-header__user-info',
}
