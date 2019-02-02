import {
  IResultWrapper,
  IErrorWrapper,
  IMessageWrapper,
  IStatusTextWrapper,
  IStatusWrapper,
  IKeyValue,
} from '../../definitions.interface';
import { ITransportRequestEntity } from '../transport.interface';

/**
 * @stable [01.02.2019]
 */
export type TransportResponseFactoryPayloadT = IKeyValue | number | string | boolean;

/**
 * @stable [01.02.2019]
 */
export interface ITransportResponseFactoryResponseEntity
  extends IResultWrapper,
          IErrorWrapper,
          IMessageWrapper,
          IStatusTextWrapper,
          IStatusWrapper {
}

/**
 * @stable [01.02.2019]
 */
export interface ITransportResponseFactory {
  makeResponse(req: ITransportRequestEntity,
               payloadEntity: TransportResponseFactoryPayloadT): ITransportResponseFactoryResponseEntity;
  makeErrorResponse?(data: TransportResponseFactoryPayloadT): ITransportResponseFactoryResponseEntity;
}
