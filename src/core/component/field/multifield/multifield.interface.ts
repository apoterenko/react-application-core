import { IEntity, EntityIdT } from '../../../definitions.interface';
import { IGridConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IBasicSelectState,
  IBasicSelectProps,
} from '../select';

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

export interface IMultiFieldPlugin {
  activeValue: IEntity[];
  originalValue: IEntity[];
  getActiveValueLength(entity: MultiFieldEntityT<IEntity>): number;
  onAdd(item: IEntity): IMultiFieldChangesEntity;
  onDelete(item: IEntity): IMultiFieldChangesEntity;
  onAddItem(item: IEntity): void;
  onDeleteItem(item: IEntity): void;
}

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldChangesEntity {
  addArray: IEntity[];
  removeArray: IEntity[];
  editArray?: IEntity[];
}

export interface IMultiEntity {
  add: IEntity[];
  remove: IEntity[];
  edit: IEntity[];
  source?: IEntity[];
}

export type NotMultiFieldEntityT<TEntity extends IEntity> = TEntity[] | EntityIdT;
export type MultiFieldEntityT<TEntity extends IEntity> = TEntity[] | IMultiEntity;
export type MultiFieldValueT<TEntity extends IEntity> = MultiFieldEntityT<TEntity> | EntityIdT;
export type MultiFieldSingleValueT = IMultiEntity | EntityIdT;
