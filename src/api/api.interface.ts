import { IIdentifiedEntity } from '../definition.interface';
import { IOperation } from '../operation/operation.interface';

export interface IApiRequest<TRequestData> extends IIdentifiedEntity {
  data: TRequestData;
  section?: string;
  operation?: IOperation;
}
