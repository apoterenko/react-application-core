import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../text-field';
import {
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IUseCameraWrapper,
  ICameraEnabledWrapper,
  IMultiWrapper,
} from '../../../definitions.interface';

export interface IBaseFileFieldState extends IBaseTextFieldState,
                                             ICameraEnabledWrapper {
}

export interface IBaseFileFieldProps extends IBaseTextFieldProps,
                                             IUseCameraWrapper,
                                             IUseDownloadActionWrapper,
                                             IFileNameWrapper,
                                             IMultiWrapper {
}
