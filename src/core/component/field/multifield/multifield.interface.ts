import { IEntity, INamedEntity } from '../../../definition.interface';

export interface IMultiFieldPlugin {
  activeValue: INamedEntity[];
  originalValue: INamedEntity[];
  onAdd(item: INamedEntity): IMultiFieldChangesResult;
  onDelete(item: INamedEntity): IMultiFieldChangesResult;
  onAddItem(item: INamedEntity): void;
  onDeleteItem(item: INamedEntity): void;
}

export interface IMultiFieldChangesResult {
  addArray: INamedEntity[];
  removeArray: INamedEntity[];
}

export interface IMultiEntity {
  add: IEntity[];
  remove: IEntity[];
  source?: IEntity[];
}

export type MultiFieldEntityT<TEntity extends IEntity> = TEntity[] | IMultiEntity;
