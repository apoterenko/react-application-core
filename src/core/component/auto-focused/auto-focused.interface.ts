import { IAutoFocusedConfiguration } from '../../configurations-definitions.interface';

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
