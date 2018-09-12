import { Store } from 'redux';
import { injectable } from 'inversify';
import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { DI_TYPES, lazyInject } from '../di';
import { IApplicationStoreEntity } from '../entities-definitions.interface';
import {
  IApplicationTransport,
  ITransportRequestEntity,
  TransportResponseErrorT,
  IApplicationTransportFactory,
  ITransportResponseEntity,
  ITransportRequestParamsEntity,
  TRANSPORT_REQUEST_CANCEL_REASON,
} from './transport.interface';
import {
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
} from './transport-reducer.interface';
import { defValuesFilter, orUndef } from '../util';

@injectable()
export class TransportService implements IApplicationTransport {
  @lazyInject(DI_TYPES.Store) private store: Store<IApplicationStoreEntity>;
  @lazyInject(DI_TYPES.TransportFactory) private transportFactory: IApplicationTransportFactory;

  public toRequestParams(req: ITransportRequestEntity): ITransportRequestParamsEntity {
    return this.transportFactory.toRequestParams(req);
  }

  public request<TResponse>(req: ITransportRequestEntity): Promise<TResponse> {
    this.onRequest(req);

    return new Promise<TResponse>((resolve, reject) => (
        this.transportFactory
          .request(req)
          .then((response) => {
            const error = response.data.error || response.data.Message;
            if (error) {
              this.onRequestError(req, error);
              reject(error);
            } else {
              const result = (req.reader ? req.reader(response.data) : response.data).result;
              this.onRequestDone(req, result);
              resolve(result);
            }
          })
          .catch((e: Error | string) => {
            if (e === TRANSPORT_REQUEST_CANCEL_REASON) {
              this.onRequestCancel(req);
              // Don't need to worry about unresolved promises as long as you don't have external references to them
            } else {
              this.onRequestError(req, e);
              reject(e);
            }
          })
      )
    );
  }

  public cancelRequest(operationId: string): void {
    this.transportFactory.cancelRequest(operationId);
  }

  private onRequest(req: ITransportRequestEntity): void {
    this.store.dispatch({
      type: TRANSPORT_REQUEST_ACTION_TYPE,
      data: this.toRequestMetaData(req),
    });
  }

  private onRequestDone(req: ITransportRequestEntity, result: AnyT): void {
    const data: ITransportResponseEntity = {
      ...this.toRequestMetaData(req),
      result,
    };
    this.store.dispatch({ type: TRANSPORT_REQUEST_DONE_ACTION_TYPE, data });
  }

  /**
   * @stable [17.08.2018]
   * @param {ITransportRequestEntity} req
   */
  private onRequestCancel(req: ITransportRequestEntity): void {
    this.store.dispatch({type: TRANSPORT_REQUEST_CANCEL_ACTION_TYPE, data: this.toRequestMetaData(req)});
  }

  private onRequestError(req: ITransportRequestEntity, error: TransportResponseErrorT): void {
    const data: ITransportResponseEntity = {
      ...this.toRequestMetaData(req),
      error,
    };
    this.store.dispatch({ type: TRANSPORT_REQUEST_ERROR_ACTION_TYPE, data });
  }

  /**
   * @stable [17.08.2018]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportResponseEntity}
   */
  private toRequestMetaData(req: ITransportRequestEntity): ITransportResponseEntity {
    return defValuesFilter<ITransportResponseEntity, ITransportResponseEntity>({
      name: req.name,
      operationId: orUndef<string>(!R.isNil(req.operation), () => req.operation.id),
    });
  }
}
