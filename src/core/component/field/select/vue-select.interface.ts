import { IMenuItemEntity, ISelectOptionEntity } from '../../../entities-definitions.interface';
import {
  IVueFieldTemplateMethodsEntity,
  IVueFieldStateEntity,
} from '../field/vue-field.interface';

/**
 * @stable [18.11.2018]
 */
export interface IVueSelectStateEntity extends IVueFieldStateEntity {
}

/**
 * @stable [17.11.2018]
 */
export interface IVueSelectTemplateMethodsEntity extends IVueFieldTemplateMethodsEntity {
  onSelect(option: IMenuItemEntity): void;
  getOptions(): ISelectOptionEntity[];
}
