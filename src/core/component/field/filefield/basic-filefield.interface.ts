import {
  IBasicTextFieldProps,
  IBasicTextFieldState,
} from '../textfield';
import {
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IUseCameraWrapper,
  ICameraEnabledWrapper,
  IMultiWrapper,
} from '../../../definitions.interface';

export interface IBaseFileFieldState extends IBasicTextFieldState,
                                             ICameraEnabledWrapper {
}

export interface IBaseFileFieldProps extends IBasicTextFieldProps,
                                             IUseCameraWrapper,
                                             IUseDownloadActionWrapper,
                                             IFileNameWrapper,
                                             IMultiWrapper {
}
