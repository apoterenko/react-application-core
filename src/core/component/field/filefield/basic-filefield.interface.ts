import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldState,
} from '../textfield';
import {
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IUseCameraWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
} from '../../../definitions.interface';

export interface IBasicFileFieldInternalState extends IBasicTextFieldState {
}

export interface IBasicFileFieldInternalProps extends IBasicTextFieldInternalProps,
                                                      ICameraWidthWrapper,
                                                      ICameraHeightWrapper,
                                                      IUseCameraWrapper,
                                                      IUseDownloadActionWrapper,
                                                      IFileNameWrapper {
}
