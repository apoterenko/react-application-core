import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IHeightWrapper,
  IWidthWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [14.05.2020]
 */
export interface IPresetsWebCameraEntity
  extends IHeightWrapper,
    IOnSelectWrapper<Blob>,
    IWidthWrapper {
}

/**
 * @generic-entity
 * @stable [02.11.2020]
 */
export interface IGenericWebCameraEntity
  extends IPresetsWebCameraEntity {
}

/**
 * @props
 * @stable [02.11.2020]
 */
export interface IWebCameraProps
  extends IGenericComponentProps,
    IGenericWebCameraEntity {
}
