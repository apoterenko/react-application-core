import { IOperation } from '../operation/operation.interface';
import { IIdentifiedEntity } from '../definition.interface';

export interface IApiRequest<TRequestData> extends IIdentifiedEntity {
  data: TRequestData;
  section?: string;
  operation?: IOperation;
}
