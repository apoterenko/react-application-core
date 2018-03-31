import {
  IEntity,
  EntityIdT,
  IApiEntityWrapper,
} from '../definitions.interface';
import { IApiEntity } from '../entities-definitions.interface';

export function makeUpdatedApiStubEntity<TEntity extends IEntity>(id: EntityIdT): IApiEntity<TEntity> {
  return {id, isNew: false, changes: {} as TEntity, merger: {} as TEntity};
}

export interface IApiEntityRequest<TEntity extends IEntity> extends IApiEntityWrapper<IApiEntity<TEntity>> {
  editApi?: string;
  addApi?: string;
  extraParams?: IEntity;
}
