import {
  IDisplayFileNameWrapper,
  IEntityCallbackWrapper,
  IFileNameWrapper,
  ILabelWrapper,
  IEntityWrapper,
} from '../../../definitions.interface';
import { IVueBasePictureViewerTemplateMethodsEntity } from '../picture/vue-index';
import { IVueViewerPropsEntity } from '../vue-viewer.interface';

/**
 * @stable [09.12.2018]
 */
export interface IVueFileViewerPropsEntity extends IVueViewerPropsEntity,
                                                   IFileNameWrapper,
                                                   ILabelWrapper,
                                                   IEntityWrapper,
                                                   IDisplayFileNameWrapper<IEntityCallbackWrapper> {
}

/**
 * @stable [09.12.2018]
 */
export interface IVueFileViewerTemplateMethodsEntity extends IVueBasePictureViewerTemplateMethodsEntity {
  getFileName?(): string;
  getLabel?(): string;
}
