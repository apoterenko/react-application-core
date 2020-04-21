import {
  IErrorWrapper,
  IMessageWrapper,
  ISubmitTextWrapper,
  ITimeoutWrapper,
  IAfterShowWrapper,
} from '../../definitions.interface';
import { IEnhancedGenericComponentProps } from '../../definition';

/**
 * @stable [22.08.2018]
 */
export interface ISnackbarConfiguration extends IEnhancedGenericComponentProps,
                                                IMessageWrapper,
                                                ISubmitTextWrapper,
                                                ITimeoutWrapper,
                                                IAfterShowWrapper {
  actionHandler?: () => void;
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
