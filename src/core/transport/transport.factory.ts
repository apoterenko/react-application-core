import { injectable } from 'inversify';
import * as R from 'ramda';
import * as URI from 'urijs';
import { LoggerFactory } from 'ts-smart-logger';

import { IApplicationSettings } from '../settings';
import { lazyInject, DI_TYPES } from '../di';
import { defValuesFilter, orUndef, isDef } from '../util';

import {
  ITransportRawResponse,
  IApplicationTransportFactory,
  ITransportRequestEntity,
  ITransportRequestParamsEntity,
  IApplicationTransportRequestFactory,
  ITransportHttpRequestEntity,
  IApplicationTransportCancelToken,
  IApplicationTransportTokenAccessor,
  TransportCancelRequestError,
} from './transport.interface';

@injectable()
export class TransportFactory implements IApplicationTransportFactory {
  private static logger = LoggerFactory.makeLogger(TransportFactory);
  private static CANCEL_MESSAGE = 'The operation has been canceled by the user.';

  private id = 0;
  private operationsMap = new Map<string, IApplicationTransportCancelToken>();

  @lazyInject(DI_TYPES.Settings) private settings: IApplicationSettings;
  @lazyInject(DI_TYPES.TransportRequestFactory) private requestFactory: IApplicationTransportRequestFactory;
  @lazyInject(DI_TYPES.TransportTokenAccessor) private tokenAccessor: IApplicationTransportTokenAccessor;

  public request(req: ITransportRequestEntity): Promise<ITransportRawResponse> {
    let cancelToken: IApplicationTransportCancelToken;
    const operationId = req.operation && req.operation.id;

    if (operationId) {
      cancelToken = this.requestFactory.cancelToken;
      if (cancelToken) {
        this.operationsMap.set(operationId, cancelToken);
      }
    }
    let headers = {};
    const isBinaryData = isDef(req.blob);
    if (isBinaryData) {
      headers = {
        'Content-Type': 'application/octet-stream',
      };
    }

    const uri0 = new URI(
      req.url || [
        isBinaryData ? this.settings.binaryUrl : this.settings.apiUrl,
        req.path || ''
      ].join('')  // URI's segment works incorrectly with a UUID (uri0.segment(req.path))
    );
    if (req.noCache !== true) {
      uri0.addSearch('_dc', Date.now());
    }

    return this.requestFactory.request<ITransportHttpRequestEntity, ITransportRawResponse>(
      defValuesFilter<ITransportHttpRequestEntity, ITransportHttpRequestEntity>({
          headers,
          url: uri0.valueOf(),
          method: req.method || 'POST',
          data: req.blob || this.toRequestParams(req),
          cancelToken: cancelToken && cancelToken.token,
        }
      ))
      .then(
        (res) => {
          TransportFactory.logger.debug(`[$TransportFactory][request] Data have been loaded. Result: `, res);
          this.clearOperation(operationId);
          return res;
        },
        (err) => {
          TransportFactory.logger.debug(`[$TransportFactory][request] An error occurred during a request. Error: ${err}`);
          this.clearOperation(operationId);

          if (err && err.message === TransportFactory.CANCEL_MESSAGE) {
            // There is no other way to determine a cancel action
            throw new TransportCancelRequestError();
          }
          throw err;
        }
      );
  }

  public cancelRequest(operationId: string): void {
    const cancelToken = this.operationsMap.get(operationId);
    if (cancelToken) {
      cancelToken.cancel(TransportFactory.CANCEL_MESSAGE);
      this.clearOperation(operationId);
    } else {
      TransportFactory.logger.warn(
        `[$TransportFactory][cancelRequest] The cancel token has not been found according to ${operationId}`
      );
    }
  }

  protected toRequestParams(req: ITransportRequestEntity): ITransportRequestParamsEntity {
    return defValuesFilter<ITransportRequestParamsEntity, ITransportRequestParamsEntity>({
      id: this.id++,
      name: req.name,
      params: orUndef(req.params, () => defValuesFilter(req.params)),
      auth: orUndef(!req.notApplyAuth, () => this.tokenAccessor.token),
    });
  }

  private clearOperation(operationId?: string): void {
    if (!R.isNil(operationId)) {
      this.operationsMap.delete(operationId);
    }
  }
}
