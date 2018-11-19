import {
  EntityIdT,
  IEntity,
  INotUseActiveValueFilterWrapper,
} from '../../../definitions.interface';
import { IMultiEntity, IMultiItemEntity } from '../../../entities-definitions.interface';
import { IBasicSelectState, IBasicSelectProps } from '../select/basic-select.interface';
import { IField } from '../field/field.interface';

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldState extends IBasicSelectState {
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldProps extends IBasicSelectProps,
                                          INotUseActiveValueFilterWrapper {
}

/**
 * @stable [04.07.2018]
 */
export interface IMultiFieldPlugin {
  activeValue: IMultiItemEntity[];
  editValue: IMultiItemEntity[];
  addValue: IMultiItemEntity[];
  originalValue: IMultiItemEntity[];
  getActiveValueLength(entity: MultiFieldEntityT): number;
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

/**
 * @stable [01.06.2018]
 */
export type NotMultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | EntityIdT;
export type MultiFieldEntityT<TEntity extends IEntity = IEntity> = TEntity[] | IMultiEntity;
export type MultiFieldSingleValueT = IMultiEntity | EntityIdT;
