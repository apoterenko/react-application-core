import { IComponentProps } from './props-definition.interface';
import {
  IBackActionConfigurationWrapper,
  IBackActionRenderedWrapper,
  IContentWrapper,
  IHeaderConfigurationWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';
import { IUserWrapperEntity } from './user-definition.interface';
import { IButtonProps } from './button-definition.interface';

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
    IContentWrapper,
    IMenuConfigurationEntity,
    IUserWrapperEntity {
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
