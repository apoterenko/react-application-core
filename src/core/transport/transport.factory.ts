import { Store } from 'redux';
import Axios from 'axios/dist/axios';
import { injectable } from 'inversify';
import * as R from 'ramda';
import * as URI from 'urijs';
import { LoggerFactory } from 'ts-smart-logger';

import { IApplicationSettings } from '../settings';
import { lazyInject, DI_TYPES } from '../di';
import { ApplicationStateT } from '../store';
import { isUndef } from '../util';
import {
  ITransportRawResponse,
  IApplicationTransportFactory,
  ITransportRequest,
  ITransportRawRequest,
} from './transport.interface';

@injectable()
export class TransportFactory implements IApplicationTransportFactory {

  private static logger = LoggerFactory.makeLogger(TransportFactory);

  private id = 0;
  private operationsMap = new Map<string, Axios.CancelTokenSource>();

  @lazyInject(DI_TYPES.Store) private store: Store<ApplicationStateT>;
  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;

  public request(req: ITransportRequest): Promise<ITransportRawResponse> {
    let source: Axios.CancelTokenSource;
    const operationId = req.operation && req.operation.id;

    if (operationId) {
      const cancelToken = Axios.CancelToken;
      source = cancelToken.source();
      this.operationsMap.set(operationId, source);
    }
    const uri0 = new URI(this.settings.apiUrl);
    if (req.noCache !== true) {
      uri0.addSearch('_dc', Date.now());
    }
    return Axios.request({
      url: uri0.valueOf(),
      method: 'POST',
      data: this.toRequestParams(req),
      ...(source ? { cancelToken: source.token } : {} ),
    }).then(
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
    const source = this.operationsMap.get(operationId);
    if (source) {
      source.cancel('The operation has been canceled by the user.');
      this.clearOperation(operationId);
    } else {
      TransportFactory.logger.warn(
          `[$TransportFactory] The source has not been found by the operationId ${operationId}`
      );
    }
  }

  protected toRequestParams(req: ITransportRequest): ITransportRawRequest {
    const request: ITransportRawRequest = {
      id: this.id++,
      name: req.name,
      params: req.params ? R.pickBy((value, key) => !isUndef(value), req.params) : null,
      auth: !req.noAuth ? this.store.getState().transport.token : null,
    };
    return R.pickBy((value, key) => !R.isNil(value), request);
  }

  private clearOperation(operationId?: string): void {
    if (!R.isNil(operationId)) {
      this.operationsMap.delete(operationId);
    }
  }
}
