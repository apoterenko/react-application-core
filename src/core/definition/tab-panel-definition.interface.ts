import {
  IActiveWrapper,
  IAllowSingleTabWrapper,
  IEntity,
  IIconWrapper,
  IItemsWrapper,
  INameWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
  IRendererWrapper,
  ITabPanelConfigurationWrapper,
  ITabPanelWrapper,
  IValueWrapper,
  IWrappedWrapper,
  IWrapperClassNameWrapper,
} from '../definitions.interface';
import { IBaseEvent } from './event-definition.interface';
import { IFormEditableEntity } from './form-definition.interface';
import { IGenericActiveValueEntity } from './entity-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @generic-entity
 * @stable [12.04.2020]
 */
export interface IGenericTabEntity
  extends IActiveWrapper,
    IIconWrapper,
    INameWrapper,
    IValueWrapper {
}

/**
 * @behavioral-entity
 * @stable [10.02.2020]
 */
export interface IBehavioralTabEntity {
}

/**
 * @props
 * @stable [10.02.2020]
 */
export interface ITabProps
  extends IGenericComponentProps,
    IGenericTabEntity,
    IBehavioralTabEntity {
}

/**
 * @generic-entity
 * @stable [10.02.2020]
 */
export interface IGenericTabPanelEntity
  extends IGenericActiveValueEntity,
    IAllowSingleTabWrapper,
    IItemsWrapper<ITabProps[]>,
    IWrappedWrapper,
    IWrapperClassNameWrapper {
}

/**
 * @behavioral-entity
 * @stable [10.02.2020]
 */
export interface IBehavioralTabPanelEntity
  extends IOnClickWrapper<ITabProps>,
    IOnCloseWrapper<ITabProps>,
    IOnDeactivateWrapper<number>,
    IRendererWrapper<ITabProps, (event: IBaseEvent) => void> {
}

/**
 * @props
 * @stable [10.02.2020]
 */
export interface ITabPanelProps
  extends IGenericComponentProps,
    IGenericTabPanelEntity,
    IBehavioralTabPanelEntity {
}

/**
 * @wrapper-entity
 * @stable [10.02.2020]
 */
export interface ITabPanelWrapperEntity
  extends ITabPanelWrapper<IGenericTabPanelEntity> {
}

/**
 * @configuration-entity
 * @stable [10.02.2020]
 */
export interface ITabPanelConfigurationEntity
  extends ITabPanelConfigurationWrapper<ITabPanelProps> {
}

/**
 * @generic-container-entity
 * @stable [12.02.2020]
 */
export interface IGenericTabPanelContainerEntity
  extends ITabPanelConfigurationEntity,
    ITabPanelWrapperEntity {
}

/**
 * @props
 * @stable [12.02.2020]
 */
export interface ITabPanelContainerProps
  extends IGenericContainerProps,
    IGenericTabPanelContainerEntity {
}

/**
 * @props
 * @stable [12.04.2020]
 */
export interface IFormTabPanelContainerProps<TEntity = IEntity>
  extends ITabPanelContainerProps,
    IFormEditableEntity<TEntity> {
}

/**
 * @initial-entity
 * @stable [12.04.2020]
 */
export const INITIAL_TAB_PANEL_ENTITY = Object.freeze<IGenericTabPanelEntity>({});

/**
 * @stable [12.04.2020]
 */
export const TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE = 'tab.panel.active.value';
export const TAB_PANEL_DESTROY_ACTION_TYPE = 'tab.panel.destroy';
export const TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE = 'tab.panel.inactive.value';
