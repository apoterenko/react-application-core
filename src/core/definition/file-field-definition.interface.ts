import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from './text-field-definition.interface';
import {
  IFileNameWrapper,
  IMultiWrapper,
  IOpenedWrapper,
  IUseCameraWrapper,
  IUseDndWrapper,
  IUseDownloadActionWrapper,
} from '../definitions.interface';

export interface IBaseFileFieldState
  extends IBaseTextFieldState,
    IOpenedWrapper {
}

// TODO Props
export interface IBaseFileFieldProps extends IBaseTextFieldProps,
  IUseCameraWrapper,
  IUseDndWrapper,
  IUseDownloadActionWrapper,
  IFileNameWrapper,
  IMultiWrapper {
}

export interface IFileFieldProps extends IBaseFileFieldProps {
}

export interface IFileFieldState extends IBaseFileFieldState {
}

/**
 * @classes
 * @stable [21.08.2020]
 */
export enum FileFieldClassesEnum {
  FILE_FIELD = 'rac-file-field',
}
