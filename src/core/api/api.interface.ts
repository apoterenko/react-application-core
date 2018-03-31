import {
  IEntityIdTWrapper,
  IChangesWrapper,
  IEntity,
  EntityIdT,
  IDefaultOperationWrapper,
  IMergerWrapper,
  IIsNewWrapper,
  IApiEntityWrapper,
} from '../definition.interface';
import { IEntityWrapperEntity } from '../entities-definitions.interface';

export interface IApiEntity<TEntity extends IEntity> extends IEntityIdTWrapper,
                                                             IChangesWrapper<TEntity>,
                                                             IEntityWrapperEntity<TEntity>,
                                                             IMergerWrapper<TEntity>,
                                                             IDefaultOperationWrapper,
                                                             IIsNewWrapper {
}

export function makeUpdatedApiStubEntity<TEntity extends IEntity>(id: EntityIdT): IApiEntity<TEntity> {
  return {id, isNew: false, changes: {} as TEntity, merger: {} as TEntity};
}

export interface IApiEntityRequest<TEntity extends IEntity> extends IApiEntityWrapper<IApiEntity<TEntity>> {
  editApi?: string;
  addApi?: string;
  extraParams?: IEntity;
}

export type ApiEntityT = IApiEntity<IEntity>;
