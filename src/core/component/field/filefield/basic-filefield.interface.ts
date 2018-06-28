import {
  IBasicTextFieldInternalProps,
  IBasicTextFieldState,
} from '../textfield';
import { IUseDownloadActionWrapper, IFileNameWrapper } from '../../../definitions.interface';

export interface IBasicFileFieldInternalState extends IBasicTextFieldState {
}

export interface IBasicFileFieldInternalProps extends IBasicTextFieldInternalProps,
                                                      IUseDownloadActionWrapper,
                                                      IFileNameWrapper {
}
