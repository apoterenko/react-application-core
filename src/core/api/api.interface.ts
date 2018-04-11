import {
  IEntity,
  IApiEntityWrapper,
} from '../definitions.interface';
import { IApiEntity } from '../entities-definitions.interface';

export interface IApiEntityRequest<TEntity extends IEntity> extends IApiEntityWrapper<IApiEntity<TEntity>> {
  editApi?: string;
  addApi?: string;
  extraParams?: IEntity;
}
