import { IIdentifiedEntity } from 'core/definition.interface';
import { IOperation } from 'core/operation';

export interface IApiEntity<TEntity> extends IIdentifiedEntity {
  entity: TEntity;
  isIdExist: boolean;
  operation?: IOperation;
  section?: string;
}
