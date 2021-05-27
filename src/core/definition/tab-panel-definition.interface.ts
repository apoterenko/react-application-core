import * as React from 'react';

import {
  IActiveWrapper,
  IAllowSingleTabWrapper,
  IContentWrapperElementWrapper,
  IEntity,
  IIconWrapper,
  IItemPropsWrapper,
  IItemsWrapper,
  INameWrapper,
  IOnClickWrapper,
  IOnDeactivateWrapper,
  IRendererWrapper,
  ITabPanelConfigurationWrapper,
  ITabPanelWrapper,
  IValueWrapper,
  IWrappedWrapper,
  IWrapperClassNameWrapper,
} from '../definitions.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import {
  IReduxActiveValueHolderEntity,
  ISelfConfigEntity,
} from './entity-definition.interface';
import { IReduxFormHolderEntity } from './form-definition.interface';

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
    IOnClickWrapper<ITabPanelOnCLickConfigEntity>,
    IOnDeactivateWrapper<number>,
    IRendererWrapper<ITabPanelRendererConfigEntity>,
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
export interface IConfigurationTabPanelEntity<TProps = ITabPanelProps>
  extends ITabPanelConfigurationWrapper<TProps> {
}

/**
 * @generic-container-entity
 * @stable [30.07.2020]
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
 * @component
 * @stable [30.03.2021]
 */
export interface ITabPanel<TProps extends ITabPanelProps = ITabPanelProps, TState = {}>
  extends IGenericComponent<TProps, TState> {
}

/**
 * @generic-container-entity
 * @stable [30.07.2020]
 */
export interface IGenericFormTabPanelContainerEntity<TEntity = IEntity>
  extends IConfigurationTabPanelEntity,
    IReduxFormHolderEntity<TEntity> {
}

/**
 * @props
 * @stable [30.07.2020]
 */
export interface IFormTabPanelContainerProps<TEntity = IEntity>
  extends IGenericContainerProps,
    IGenericFormTabPanelContainerEntity<TEntity> {
}

/**
 * @config-entity
 * @stable [31.03.2021]
 */
export interface ITabPanelRendererConfigEntity
  extends ISelfConfigEntity<ITabPanelProps, ITabPanel>,
    IContentWrapperElementWrapper<(content: React.ReactNode) => JSX.Element>,
    IItemPropsWrapper<ITabProps> {
}

/**
 * @config-entity
 * @stable [31.03.2021]
 */
export interface ITabPanelOnCLickConfigEntity
  extends IItemPropsWrapper<ITabProps>,
    ISelfConfigEntity<ITabPanelProps, ITabPanel> {
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
  ACTIVE_TAB = 'rac-tab-panel__active-tab',
  AFTER_ACTIVE_TAB = 'rac-tab-panel__after-active-tab',
  BEFORE_ACTIVE_TAB = 'rac-tab-panel__before-active-tab',
  FIRST_TAB = 'rac-tab-panel__first-tab',
  INACTIVE_TAB = 'rac-tab-panel__inactive-tab',
  LAST_TAB = 'rac-tab-panel__last-tab',
  ODD_TAB = 'rac-tab-panel__odd-tab',
  SINGLE_TAB = 'rac-tab-panel__single-tab',
  TAB = 'rac-tab-panel__tab',
  TAB_CONTENT = 'rac-tab-panel__tab-content',
  TAB_ICON = 'rac-tab-panel__tab-icon',
  TAB_PANEL = 'rac-tab-panel',
  TAB_PANEL_WRAPPER = 'rac-tab-panel-wrapper',
}
