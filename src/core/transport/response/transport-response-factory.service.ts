import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  ITransportResponseFactory,
  TransportResponseFactoryPayloadT,
  ITransportResponseFactoryResponseEntity,
} from './transport-response-factory.interface';
import { IDataWrapper, AnyT } from '../../definitions.interface';
import { ITransportRequestEntity } from '../transport.interface';
import { isFn } from '../../util';

@injectable()
export class TransportResponseFactory implements ITransportResponseFactory {

  /**
   * This is a default error response handler. The core uses Axios by default therefore here we gets a response from this one.
   *
   * @stable [01.02.2019]
   * @param {TransportResponseFactoryPayloadT} payloadEntity
   * @returns {ITransportResponseFactoryResponseEntity}
   */
  public makeErrorResponse(payloadEntity: {response?, message?}): ITransportResponseFactoryResponseEntity {
    const response = payloadEntity.response;
    return {
      error: true,
      message: payloadEntity.message,
      ...(
        response && {
          status: response.status,
          statusText: response.statusText,
        }
      ),
    };
  }

  /**
   * This is a default response handler. The core uses Axios by default therefore here we gets a response from this one.
   *
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @param {IDataWrapper} payloadEntity
   * @returns {ITransportResponseFactoryResponseEntity}
   */
  public makeResponse(req: ITransportRequestEntity,
                      payloadEntity: IDataWrapper<AnyT>): ITransportResponseFactoryResponseEntity {
    const data = payloadEntity.data;
    const errorData = this.readErrorResponseData(data);
    if (!R.isNil(errorData)) {
      return {
        ...errorData,
        error: true,
      };
    }
    return {result: isFn(req.reader)
        ? req.reader(data)
        : this.readResponseData(data)};
  }

  /**
   * @stable [02.02.2019]
   * @param {AnyT} data
   * @returns {AnyT}
   */
  protected readResponseData<TData>(data: AnyT): AnyT {
    return data;
  }

  /**
   * @stable [04.02.2019]
   * @param {AnyT} data
   * @returns {ITransportResponseFactoryResponseEntity}
   */
  protected readErrorResponseData<TData>(data: AnyT): ITransportResponseFactoryResponseEntity {
    return null;
  }
}
