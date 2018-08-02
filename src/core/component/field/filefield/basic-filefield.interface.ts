import {
  IBasicTextFieldProps,
  IBasicTextFieldState,
} from '../textfield';
import {
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IUseCameraWrapper,
  ICameraEnabledWrapper,
} from '../../../definitions.interface';

export interface IBasicFileFieldInternalState extends IBasicTextFieldState,
                                                      ICameraEnabledWrapper {
}

export interface IBasicFileFieldInternalProps extends IBasicTextFieldProps,
                                                      IUseCameraWrapper,
                                                      IUseDownloadActionWrapper,
                                                      IFileNameWrapper {
}
