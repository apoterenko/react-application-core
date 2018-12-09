import { IVueBasePictureViewerTemplateMethodsEntity } from '../picture/vue-index';

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
