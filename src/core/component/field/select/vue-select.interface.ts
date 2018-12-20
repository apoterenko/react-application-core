import { IMenuItemEntity, ISelectOptionEntity } from '../../../entities-definitions.interface';
import {
  IVueFieldTemplateMethodsEntity,
} from '../field/vue-field.interface';

/**
 * @stable [20.12.2018]
 */
export type VueSelectFilterT = (option: ISelectOptionEntity, query: string) => boolean;

/**
 * @stable [17.11.2018]
 */
export interface IVueSelectTemplateMethodsEntity extends IVueFieldTemplateMethodsEntity {
  onSelect(option: IMenuItemEntity): void;
  getOptions(): ISelectOptionEntity[];
}
