import {
  IContainerProps,
  ITabPanelConfigurationEntity,
  ITabPanelWrapperEntity,
} from '../../definition';

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelContainerProps
  extends IContainerProps,
    ITabPanelWrapperEntity,
    ITabPanelConfigurationEntity {
}

/**
 * @stable [30.08.2018]
 * @type {string}
 */
export const TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE = 'tabpanel.active.value';
export const TAB_PANEL_DEACTIVATED_VALUE_ACTION_TYPE = 'tabpanel.deactivated.value';
export const TAB_PANEL_DESTROY_ACTION_TYPE = 'tabpanel.destroy';
