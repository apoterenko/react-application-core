import { IIdentifiedEntity, IChangeable, IEntity } from '../definition.interface';
import { IOperation } from '../operation';

export interface IApiEntity<TEntity> extends IIdentifiedEntity, IChangeable {
  isIdExist: boolean;
  entity?: TEntity;
  operation?: IOperation;
  section?: string;
}

export type ApiEntityT = IApiEntity<IEntity>;
