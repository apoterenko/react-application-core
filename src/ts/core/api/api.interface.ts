import { IOperation } from '../operation/operation.interface';

export interface IApiRequest<TRequestData> {
  id: number | string;
  section?: string;
  data: TRequestData;
  operation?: IOperation;
}
