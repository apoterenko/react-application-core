import {
  IIdentifiedEntity, IChangeable, IEntity, EntityIdT, IEntityable, IOperationable
} from '../definition.interface';
import { IOperation } from '../operation';

export interface IApiEntity<TEntity extends IEntity> extends IIdentifiedEntity,
                                                             IChangeable<TEntity>,
                                                             IEntityable<TEntity>,
                                                             IOperationable {
  isNew: boolean;
  section?: string;
}

export function makeUpdatedApiStubEntity<TEntity extends IEntity>(id: EntityIdT): IApiEntity<TEntity> {
  return {id, isNew: false, changes: {} as TEntity};
}

export interface IApiEntityRequest<TEntity extends IEntity> {
  editApi?: string;
  addApi?: string;
  apiEntity: IApiEntity<TEntity>;
  extraParams?: IEntity;
}
