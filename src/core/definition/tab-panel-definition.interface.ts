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
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IReduxActiveValueHolderEntity } from './entity-definition.interface';
import { IReduxHolderFormEntity } from './form-definition.interface';

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
  extends IReduxActiveValueHolderEntity {
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
 * @redux-holder-entity
 * @stable [29.07.2020]
 */
export interface IReduxTabPanelHolderEntity<TEntity = IReduxTabPanelEntity>
  extends ITabPanelWrapper<TEntity> {
}

/**
 * @configuration-entity
 * @stable [29.07.2020]
 */
export interface IConfigurationTabPanelEntity
  extends ITabPanelConfigurationWrapper<ITabPanelProps> {
}

/**
 * @generic-container-entity
 * @stable [12.02.2020]
 */
export interface IGenericTabPanelContainerEntity
  extends IConfigurationTabPanelEntity,
    IReduxTabPanelHolderEntity {
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
    IReduxHolderFormEntity<TEntity> {
}

/**
 * @initial-redux-entity
 * @stable [28.07.2020]
 */
export const INITIAL_REDUX_TAB_PANEL_ENTITY = Object.freeze<IReduxTabPanelEntity>({});

/**
 * @stable [12.04.2020]
 */
export const TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE = 'tab.panel.active.value';
export const TAB_PANEL_DESTROY_ACTION_TYPE = 'tab.panel.destroy';
export const TAB_PANEL_INACTIVE_VALUE_ACTION_TYPE = 'tab.panel.inactive.value';

/**
 * @classes
 * @stable [26.03.2020]
 */
export enum TabPanelClassesEnum {
  TAB_PANEL = 'rac-tab-panel',
  TAB_PANEL_WRAPPER = 'rac-tab-panel-wrapper',
}
