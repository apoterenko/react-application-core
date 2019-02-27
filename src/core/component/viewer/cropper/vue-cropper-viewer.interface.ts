import Cropper from 'cropperjs';

import { IVueBasePictureViewerTemplateMethodsEntity } from '../picture/vue-index';
import { IVueBaseProps } from '../../base/vue-index';
import { IOptionsWrapper, ICroppedCanvasOptionsWrapper } from '../../../definitions.interface';

/**
 * @stable [27.02.2019]
 */
export interface IVueCropperViewerCroppedCanvasOptionsEntity extends Cropper.GetCroppedCanvasOptions {
}

/**
 * @stable [27.02.2019]
 */
export interface IVueCropperViewerOptionsEntity extends Cropper.Options {
}

/**
 * @stable [27.02.2019]
 */
export interface IVueCropperViewerProps
  extends IVueBaseProps,
    IOptionsWrapper<IVueCropperViewerOptionsEntity>,
    ICroppedCanvasOptionsWrapper<IVueCropperViewerCroppedCanvasOptionsEntity> {
}

/**
 * @stable [29.11.2018]
 */
export interface IVueCropperPictureViewerTemplateMethodsEntity extends IVueBasePictureViewerTemplateMethodsEntity {
  onApply?(): void;
}

/**
 * @stable [29.11.2018]
 */
export const VUE_CROPPER_VIEWER_CROP_EVENT = 'crop';
export const VUE_CROPPER_VIEWER_NAME = 'vue-cropper-viewer';
