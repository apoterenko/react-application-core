import { injectable } from 'inversify';
import * as R from 'ramda';

import { IDataWrapper, AnyT } from '../../../definitions.interface';
import {
  ITransportRequestEntity,
  ITransportResponseFactory,
  ITransportResponseFactoryEntity,
  TransportResponseFactoryPayloadT,
} from '../../../definition';
import { isFn } from '../../../util';

@injectable()
export class TransportResponseFactory implements ITransportResponseFactory {

  /**
   * This is a default error response handler. The core uses Axios by default therefore here we gets a response from this one.
   *
   * @stable [01.02.2019]
   * @param {TransportResponseFactoryPayloadT} payloadEntity
   * @returns {ITransportResponseFactoryEntity}
   */
  public makeErrorResponse(payloadEntity: {response?, message?}): ITransportResponseFactoryEntity {
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
   * @returns {ITransportResponseFactoryEntity}
   */
  public makeResponse(req: ITransportRequestEntity,
                      payloadEntity: IDataWrapper<AnyT>): ITransportResponseFactoryEntity {
    const data = payloadEntity.data;
    const errorData = this.readResponseErrorData(data);
    if (!R.isNil(errorData)) {
      return {
        ...errorData,
        error: true,
      };
    }
    return {
      result: isFn(req.responseReader) ? req.responseReader(data) : this.readResponseData(data),
    };
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
   * @returns {ITransportResponseFactoryEntity}
   */
  protected readResponseErrorData<TData>(data: AnyT): ITransportResponseFactoryEntity {
    return null;
  }
}
