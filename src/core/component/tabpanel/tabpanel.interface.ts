import { IActiveValueWrapper } from '../../definitions.interface';
import { ITabPanelConfigurationWrapper } from '../../configurations-definitions.interface';
import { IComponent } from '../../entities-definitions.interface';
import { ITabPanelProps } from '../../props-definitions.interface';
import { ITabPanelWrapperEntity, IContainerProps } from '../../definition';

/**
 * @stable [11.08.2018]
 */
export interface ITabPanelState extends IActiveValueWrapper {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelContainerProps extends IContainerProps,
                                                 ITabPanelWrapperEntity,
                                                 ITabPanelConfigurationWrapper {
}

/**
 * @stable [15.08.2018]
 */
export interface ITabPanel extends IComponent<ITabPanelProps, ITabPanelState> {
  onForward(): void;
  onBackward(): void;
}

/**
 * @stable [30.08.2018]
 * @type {string}
 */
export const TAB_PANEL_ACTIVE_VALUE_ACTION_TYPE = 'tabpanel.active.value';
export const TAB_PANEL_DEACTIVATED_VALUE_ACTION_TYPE = 'tabpanel.deactivated.value';
export const TAB_PANEL_DESTROY_ACTION_TYPE = 'tabpanel.destroy';
