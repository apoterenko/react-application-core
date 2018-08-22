import { FunctionT } from '../../util';
import {
  IErrorWrapper,
  IMessageWrapper,
  IActionTextWrapper,
  ITimeoutWrapper,
  IAfterShowWrapper,
} from '../../definitions.interface';
import { IComponentConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarConfiguration extends IComponentConfiguration,
                                                IMessageWrapper,
                                                IActionTextWrapper,
                                                ITimeoutWrapper,
                                                IAfterShowWrapper {
  actionHandler?: FunctionT;
}

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarEntity extends IErrorWrapper {
}

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarProps extends ISnackbarConfiguration,
                                        ISnackbarEntity {
}
