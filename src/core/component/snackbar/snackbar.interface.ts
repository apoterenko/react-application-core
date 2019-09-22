import { FunctionT } from '../../util';
import {
  IErrorWrapper,
  IMessageWrapper,
  IActionTextWrapper,
  ITimeoutWrapper,
  IAfterShowWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../definition';

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarConfiguration extends IComponentProps,
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
