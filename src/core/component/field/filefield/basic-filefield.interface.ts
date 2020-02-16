import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../text-field';
import {
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IUseCameraWrapper,
  IOpenedWrapper,
  IMultiWrapper,
} from '../../../definitions.interface';

export interface IBaseFileFieldState
  extends IBaseTextFieldState,
    IOpenedWrapper {
}

export interface IBaseFileFieldProps extends IBaseTextFieldProps,
                                             IUseCameraWrapper,
                                             IUseDownloadActionWrapper,
                                             IFileNameWrapper,
                                             IMultiWrapper {
}
