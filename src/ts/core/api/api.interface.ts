import { IOperation } from '../operation/operation.interface';

export interface IApiIdentifiedEntity {
  id?: number | string;
}

export interface IApiRequest<TRequestData> extends IApiIdentifiedEntity {
  data: TRequestData;
  section?: string;
  operation?: IOperation;
}
