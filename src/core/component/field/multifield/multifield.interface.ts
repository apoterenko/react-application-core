import {
  IEntity,
} from '../../../definitions.interface';
import {
  IField,
  IMultiItemEntity,
  MultiFieldValueT,
} from '../../../definition';

/**
 * @stable [04.07.2018]
 */
export interface IMultiFieldPlugin {
  activeValue: IEntity[];
  editValue: IMultiItemEntity[];
  addValue: IMultiItemEntity[];
  originalValue: IMultiItemEntity[];
  getActiveValueLength(entity: MultiFieldValueT): number;
  onAdd(item: IMultiItemEntity): IMultiFieldChangesEntity;
  onDelete(item: IMultiItemEntity): IMultiFieldChangesEntity;
  onAddItem(item: IMultiItemEntity): void;
  onMergeItem(item: IMultiItemEntity): void;
  onEditItem(item: IMultiItemEntity): void;
  onDeleteItem(item: IMultiItemEntity): void;
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldChangesEntity {
  addArray: IEntity[];
  removeArray: IMultiItemEntity[];
  editArray?: IMultiItemEntity[];
}

/**
 * @stable [19.08.2018]
 */
export interface IMultiField extends IField {
  deleteItem(item: IMultiItemEntity): void;
  addItem(item: IMultiItemEntity): void;
  editItem(item: IMultiItemEntity): void;
  mergeItem(item: IMultiItemEntity): void;
}
