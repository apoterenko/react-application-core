import {
  EntityIdT,
  IEntityIdTWrapper,
} from '../../../definitions.interface';
import { IFieldChangeEntity } from '../../../entities-definitions.interface';
import { IBasicSelectState, IBasicSelectProps } from '../select';

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldState extends IBasicSelectState {
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldProps extends IBasicSelectProps {
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldPlugin {
  activeValue: IMultiItemEntity[];
  originalValue: IMultiItemEntity[];
  getActiveValueLength(entity: MultiFieldEntityT): number;
  onAdd(item: IMultiItemEntity): IMultiFieldChangesEntity;
  onDelete(item: IMultiItemEntity): IMultiFieldChangesEntity;
  onAddItem(item: IMultiItemEntity): void;
  onDeleteItem(item: IMultiItemEntity): void;
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldChangesEntity {
  addArray: IMultiItemEntity[];
  removeArray: IMultiItemEntity[];
  editArray?: IMultiItemEntity[];
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiItemEntity extends IEntityIdTWrapper,
                                          IFieldChangeEntity {
}

/**
 * @stable [02.06.2018]
 */
export interface IMultiEntity {
  add: IMultiItemEntity[];
  remove: IMultiItemEntity[];
  edit: IMultiItemEntity[];
  source?: IMultiItemEntity[];
}

/**
 * @stable [01.06.2018]
 */
export type NotMultiFieldEntityT<TEntity extends IMultiItemEntity = IMultiItemEntity> = TEntity[] | EntityIdT;
export type MultiFieldEntityT<TEntity extends IMultiItemEntity = IMultiItemEntity> = TEntity[] | IMultiEntity;
export type MultiFieldValueT<TEntity extends IMultiItemEntity = IMultiItemEntity> = MultiFieldEntityT<TEntity> | EntityIdT;
export type MultiFieldSingleValueT = IMultiEntity | EntityIdT;
