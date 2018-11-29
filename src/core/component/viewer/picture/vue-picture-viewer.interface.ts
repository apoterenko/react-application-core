import { IVueViewerTemplateMethodsEntity } from '../vue-viewer.interface';

/**
 * @stable [29.11.2018]
 */
export interface IVueBasePictureViewerTemplateMethodsEntity extends IVueViewerTemplateMethodsEntity {
  getBackgroundImage?(): string;
}
