import { IIdentifiedEntity, IChangeable } from '../definition.interface';
import { IOperation } from '../operation';

export interface IApiEntity<TEntity> extends IIdentifiedEntity, IChangeable {
  isIdExist: boolean;
  entity?: TEntity;
  operation?: IOperation;
  section?: string;
}
