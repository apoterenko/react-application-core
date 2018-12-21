import { IEntity } from '../../../definitions.interface';
import { IVueFieldTemplateMethods } from '../field/vue-index';
import { IVueViewerListenersEntity, IVueBaseFileViewerProps } from '../../viewer/vue-index';

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethods extends IVueFieldTemplateMethods {
  onFilesSelect?(files: File[], index?: number): string[];
  getLabel?(index?: number): string;
  getPlaceholder?(index?: number): string;
  getViewerComponent?(file: File, index: number): string;
  getViewerBindings?(...AnyT): IVueBaseFileViewerProps;
  getViewerListeners?(...AnyT): IVueViewerListenersEntity<File>;
  getFiles?(...AnyT): IEntity[];
}
