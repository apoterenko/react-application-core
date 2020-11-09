import {
  IBaseTextFieldState,
  IPresetsBaseTextFieldEntity,
  IReduxBaseTextFieldEntity,
} from './text-field-definition.interface';
import {
  ICameraActionDisabledWrapper,
  IFileNameWrapper,
  IMultiWrapper,
  IUseCameraWrapper,
  IUseDownloadWrapper,
  IUseVideoWrapper,
} from '../definitions.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';

/**
 * @state
 * @stable [07.11.2020]
 */
export interface IBaseFileFieldState
  extends IBaseTextFieldState {

  $$videoOpened?: boolean;
}

/**
 * @presets-entity
 * @stable [17.06.2020]
 */
export interface IPresetsBaseFileFieldEntity
  extends IPresetsBaseTextFieldEntity,
    ICameraActionDisabledWrapper,
    IUseCameraWrapper,
    IUseDownloadWrapper,
    IUseVideoWrapper {
}

/**
 * @redux-entity
 * @stable [17.06.2020]
 */
export interface IReduxBaseFileFieldEntity
  extends IReduxBaseTextFieldEntity {
}

/**
 * @generic-entity
 * @stable [14.10.2020]
 */
export interface IGenericBaseFileFieldEntity
  extends IPresetsBaseFileFieldEntity,
    IReduxBaseFileFieldEntity {
}

// TODO Props
export interface IBaseFileFieldProps
  extends IEnhancedGenericComponentProps,
    IGenericBaseFileFieldEntity,
    IFileNameWrapper,
    IMultiWrapper {
  onCamera?(): void;
  cameraData?: any;
}

export interface IFileFieldProps
  extends IBaseFileFieldProps {
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
