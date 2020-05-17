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
import { IFormEntity } from './form-definition.interface';
import { IReduxActiveValueEntity } from './entity-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';

/**
 * @presets-entity
 * @stable [17.05.2020]
 */
export interface IPresetsTabEntity
  extends IActiveWrapper,
    IIconWrapper,
    INameWrapper,
    IValueWrapper {
}

/**
 * @generic-entity
 * @stable [12.04.2020]
 */
export interface IGenericTabEntity
  extends IPresetsTabEntity {
}

/**
 * @props
 * @stable [10.02.2020]
 */
export interface ITabProps
  extends IGenericComponentProps,
    IGenericTabEntity {
}

/**
 * @redux-entity
 * @stable [17.05.2020]
 */
export interface IReduxTabPanelEntity
  extends IReduxActiveValueEntity {
}

/**
 * @presets-entity
 * @stable [17.05.2020]
 */
export interface IPresetsTabPanelEntity
  extends IAllowSingleTabWrapper,
    IItemsWrapper<ITabProps[]>,
    IOnClickWrapper<ITabProps>,
    IOnCloseWrapper<ITabProps>,
    IOnDeactivateWrapper<number>,
    IRendererWrapper<ITabProps, (event: IBaseEvent) => void>,
    IWrappedWrapper,
    IWrapperClassNameWrapper {
}

/**
 * @generic-entity
 * @stable [17.05.2020]
 */
export interface IGenericTabPanelEntity
  extends IReduxTabPanelEntity,
    IPresetsTabPanelEntity {
}

/**
 * @props
 * @stable [17.05.2020]
 */
export interface ITabPanelProps
  extends IGenericComponentProps,
    IGenericTabPanelEntity {
}

/**
 * @wrapper-entity
 * @stable [17.05.2020]
 */
export interface ITabPanelEntity
  extends ITabPanelWrapper<IReduxTabPanelEntity> {
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
    ITabPanelEntity {
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
    IFormEntity<TEntity> {
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
