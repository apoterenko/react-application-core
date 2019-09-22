import {
  IDelayTimeoutWrapper,
  IRobotModeWrapper,
  IOnSelectWrapper,
  IIgnoreEnterKeyCodeWrapper,
} from '../../definitions.interface';
import { IUniversalComponentEntity } from '../../definition';

/**
 * @stable [15.05.2018]
 */
export interface IAutoFocusedConfiguration extends IUniversalComponentEntity,
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
