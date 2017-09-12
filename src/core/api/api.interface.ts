import { IIdentifiedEntity } from 'core/definition.interface';
import { IOperation } from 'core/operation';

export interface IApiPayload<TRequestData> extends IIdentifiedEntity {
  data: TRequestData;
  operation?: IOperation;
  section?: string;
}
