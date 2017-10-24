import { IIdentifiedEntity, IChangeable, IEntity } from '../definition.interface';
import { IOperation } from '../operation';

export interface IApiEntity<TEntity extends IEntity> extends IIdentifiedEntity, IChangeable<TEntity> {
  isNew: boolean;
  operation?: IOperation;
  section?: string;
}

export interface IApiEntityRequest<TEntity extends IEntity> {
  editApi?: string;
  addApi?: string;
  apiEntity: IApiEntity<TEntity>;
  extraParams?: IEntity;
}
