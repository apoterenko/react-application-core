import { Store } from 'redux';
import { injectable } from 'inversify';
import * as R from 'ramda';
import * as URI from 'urijs';
import { LoggerFactory } from 'ts-smart-logger';

import { IApplicationSettings } from '../settings';
import { lazyInject, DI_TYPES } from '../di';
import { ApplicationStateT } from '../store';
import { noUndefValuesFilter, orUndef } from '../util';

import {
  ITransportRawResponse,
  IApplicationTransportFactory,
  ITransportRequest,
  ITransportRawRequest,
  IApplicationTransportRequestFactory,
  IApplicationTransportRequest,
  IApplicationTransportCancelToken,
} from './transport.interface';

@injectable()
export class TransportFactory implements IApplicationTransportFactory {

  private static logger = LoggerFactory.makeLogger(TransportFactory);

  private id = 0;
  private operationsMap = new Map<string, IApplicationTransportCancelToken>();

  @lazyInject(DI_TYPES.Store) private store: Store<ApplicationStateT>;
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;
  @lazyInject(DI_TYPES.TransportRequestFactory) private trFactory: IApplicationTransportRequestFactory;

  public request(req: ITransportRequest): Promise<ITransportRawResponse> {
    let cancelToken: IApplicationTransportCancelToken;
    const operationId = req.operation && req.operation.id;

    if (operationId) {
      cancelToken = this.trFactory.cancelToken;
      if (cancelToken) {
        this.operationsMap.set(operationId, cancelToken);
      }
    }
    const uri0 = new URI(this.settings.apiUrl);
    if (req.noCache !== true) {
      uri0.addSearch('_dc', Date.now());
    }
    return this.trFactory.request<IApplicationTransportRequest, ITransportRawResponse>(
        noUndefValuesFilter<IApplicationTransportRequest, IApplicationTransportRequest>({
              url: uri0.valueOf(),
              method: 'POST',
              data: this.toRequestParams(req),
              cancelToken: cancelToken && cancelToken.token,
            }
        ))
        .then(
            (res) => {
              this.clearOperation(operationId);
              return res;
            },
            (err) => {
              this.clearOperation(operationId);
              throw err; // This is because of the strange axios behavior
            }
        );
  }

  public cancelRequest(operationId: string): void {
    const cancelToken = this.operationsMap.get(operationId);
    if (cancelToken) {
      cancelToken.cancel('The operation has been canceled by the user.');
      this.clearOperation(operationId);
    } else {
      TransportFactory.logger.warn(
          `[$TransportFactory] The cancel token has not been found according to ${operationId}`
      );
    }
  }

  protected toRequestParams(req: ITransportRequest): ITransportRawRequest {
    const request: ITransportRawRequest = {
      id: this.id++,
      name: req.name,
      params: orUndef(req.params, () => noUndefValuesFilter(req.params)),
      auth: orUndef(!req.noAuth, () => this.store.getState().transport.token),
    };
    return noUndefValuesFilter(request);
  }

  private clearOperation(operationId?: string): void {
    if (!R.isNil(operationId)) {
      this.operationsMap.delete(operationId);
    }
  }
}
