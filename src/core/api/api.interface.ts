import {
  IIdentifiedEntity,
  IChangeable,
  IEntity,
  EntityIdT,
  IEntityable,
  IOperationable,
  IMergeable,
} from '../definition.interface';

export interface IApiEntity<TEntity extends IEntity> extends IIdentifiedEntity,
                                                             IChangeable<TEntity>,
                                                             IEntityable<TEntity>,
                                                             IMergeable<TEntity>,
                                                             IOperationable {
  isNew: boolean;
  section?: string;
}

export function makeUpdatedApiStubEntity<TEntity extends IEntity>(id: EntityIdT): IApiEntity<TEntity> {
  return {id, isNew: false, changes: {} as TEntity, merger: {} as TEntity};
}

export interface IApiEntityable<TEntity extends IEntity> {
  apiEntity: IApiEntity<TEntity>;
}

export interface IApiEntityRequest<TEntity extends IEntity> extends IApiEntityable<TEntity> {
  editApi?: string;
  addApi?: string;
  extraParams?: IEntity;
}

export type ApiEntityT = IApiEntity<IEntity>;
