import { Store } from 'redux';
import { injectable } from 'inversify';

import { AnyT } from '../definitions.interface';
import { DI_TYPES, lazyInject } from '../di';
import { IDefaultApplicationState } from '../store';

import {
  IApplicationTransport,
  ITransportRequestEntity,
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TransportResponseErrorT,
  IApplicationTransportFactory,
  ITransportResponsePayload,
} from './transport.interface';

@injectable()
export class TransportService implements IApplicationTransport {

  @lazyInject(DI_TYPES.Store) private store: Store<IDefaultApplicationState>;
  @lazyInject(DI_TYPES.TransportFactory) private transportFactory: IApplicationTransportFactory;

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
                }, (e: Error | string) => {
                  this.onRequestError(req, e);
                  reject(e);
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
    const data: ITransportResponsePayload = {
      ...this.toRequestMetaData(req),
      result,
    };
    this.store.dispatch({ type: TRANSPORT_REQUEST_DONE_ACTION_TYPE, data });
  }

  private onRequestError(req: ITransportRequestEntity, error: TransportResponseErrorT): void {
    const data: ITransportResponsePayload = {
      ...this.toRequestMetaData(req),
      error,
    };
    this.store.dispatch({ type: TRANSPORT_REQUEST_ERROR_ACTION_TYPE, data });
  }

  private toRequestMetaData(req: ITransportRequestEntity): ITransportResponsePayload {
    return {
      name: req.name,
      ...req.operation ? { operationId: req.operation.id } : {},
    };
  }
}
