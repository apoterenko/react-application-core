import { IIdentifiedEntity, IChangeable } from 'core/definition.interface';
import { IOperation } from 'core/operation';

export interface IApiEntity<TEntity> extends IIdentifiedEntity, IChangeable {
  isIdExist: boolean;
  entity?: TEntity;
  operation?: IOperation;
  section?: string;
}
