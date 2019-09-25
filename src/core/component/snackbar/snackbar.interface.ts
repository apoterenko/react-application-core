import { FunctionT } from '../../util';
import {
  IErrorWrapper,
  IMessageWrapper,
  ISubmitTextWrapper,
  ITimeoutWrapper,
  IAfterShowWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../definition';

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarConfiguration extends IComponentProps,
                                                IMessageWrapper,
                                                ISubmitTextWrapper,
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
