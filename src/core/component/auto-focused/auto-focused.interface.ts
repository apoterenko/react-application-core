import {
  IDelayTimeoutWrapper,
  IRobotModeWrapper,
  IOnSelectWrapper,
  IIgnoreEnterKeyCodeWrapper,
} from '../../definitions.interface';
import { IComponentEntity } from '../../configurations-definitions.interface';

/**
 * @stable [15.05.2018]
 */
export interface IAutoFocusedConfiguration extends IComponentEntity,
                                                   IDelayTimeoutWrapper,
                                                   IIgnoreEnterKeyCodeWrapper,
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
