import { IDelayTimeoutWrapper, IRobotModeWrapper, IOnSelectWrapper } from '../../definitions.interface';
import { IUniversalComponentConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [15.05.2018]
 */
export interface IAutoFocusedConfiguration extends IUniversalComponentConfiguration,
                                                   IDelayTimeoutWrapper,
                                                   IOnSelectWrapper<string>,
                                                   IRobotModeWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IAutoFocusedProps extends IAutoFocusedConfiguration {
}

/**
 * @stable [04.05.2018]
 */
export interface IAutoFocusedState {
  focusedFieldValue?: string;
}
