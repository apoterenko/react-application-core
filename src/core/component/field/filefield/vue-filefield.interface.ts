import { IEntity } from '../../../definitions.interface';
import { IVueFieldTemplateMethodsEntity } from '../field/vue-index';
import { IVueViewerListenersEntity, IVueFileViewerPropsEntity } from '../../viewer/vue-index';

/**
 * @stable [28.11.2018]
 */
export interface IVueBaseFileFieldTemplateMethodsEntity extends IVueFieldTemplateMethodsEntity {
  onFilesSelect?(files: File[], index?: number): string[];
  getLabel?(index?: number): string;
  getPlaceholder?(index?: number): string;
  getViewerComponent?(): string;
  getViewerBindings?(...AnyT): IVueFileViewerPropsEntity;
  getViewerListeners?(...AnyT): IVueViewerListenersEntity<File>;
  getFiles(...AnyT): IEntity[];
}
