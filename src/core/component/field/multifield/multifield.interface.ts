import { IEntity, EntityIdT } from '../../../definition.interface';

export interface IMultiFieldPlugin {
  activeValue: IEntity[];
  originalValue: IEntity[];
  getActiveValueLength(entity: MultiFieldEntityT<IEntity>): number;
  onAdd(item: IEntity): IMultiFieldChangesResult;
  onDelete(item: IEntity): IMultiFieldChangesResult;
  onAddItem(item: IEntity): void;
  onDeleteItem(item: IEntity): void;
}

export interface IMultiFieldChangesResult {
  addArray: IEntity[];
  removeArray: IEntity[];
}

export interface IMultiEntity {
  add: IEntity[];
  remove: IEntity[];
  source?: IEntity[];
}

export type NotMultiFieldEntityT<TEntity extends IEntity> = TEntity[] | EntityIdT;
export type MultiFieldEntityT<TEntity extends IEntity> = TEntity[] | IMultiEntity;
export type MultiFieldValueT<TEntity extends IEntity> = MultiFieldEntityT<TEntity> | EntityIdT;
