import { injectable } from 'inversify';
import * as R from 'ramda';

import { lazyInject, DI_TYPES } from '../../di';
import { uuid, ifNotNilThanValue, isFn } from '../../util';
import {
  ITransportRequestEntity,
  ITransportCancelTokenEntity,
} from '../transport.interface';
import { ITransportRequestProvider, ITransportRequestPayloadFactory } from '../request';
import { ITransportResponseFactory } from '../response';
import { ISettings } from '../../settings';
import { ITransportFactory, ITransportFactoryResponseEntity } from './transport-factory.interface';

@injectable()
export class TransportFactory implements ITransportFactory {
  private readonly cancelUuid = uuid();
  private readonly operationsIdsMap = new Map<string, ITransportCancelTokenEntity>();
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettings;
  @lazyInject(DI_TYPES.TransportRequestProvider) private readonly requestProvider: ITransportRequestProvider;
  @lazyInject(DI_TYPES.TransportRequestPayloadFactory) private readonly requestPayloadFactory: ITransportRequestPayloadFactory;
  @lazyInject(DI_TYPES.TransportResponseFactory) private readonly responseFactory: ITransportResponseFactory;

  /**
   * @stable [11.08.2019]
   * @param {ITransportRequestEntity} req
   * @param {(payload: ITransportRequestEntity) => ITransportRequestEntity} requestPayloadHandler
   * @returns {Promise<ITransportFactoryResponseEntity>}
   */
  public async request(req: ITransportRequestEntity,
                       requestPayloadHandler?: (payload: ITransportRequestEntity) => ITransportRequestEntity): Promise<ITransportFactoryResponseEntity> {
    let cancelTokenEntity: ITransportCancelTokenEntity;
    const operationId = this.toOperationId(req);
    if (operationId) {
      cancelTokenEntity = this.requestProvider.provideCancelToken();
      if (cancelTokenEntity) {
        this.operationsIdsMap.set(operationId, cancelTokenEntity);
      }
    }
    let res;
    const requestPayload = this.requestPayloadFactory.makeRequestPayload(req, cancelTokenEntity);
    try {
      res = await this.requestProvider.provideRequest(
        isFn(requestPayloadHandler) ? requestPayloadHandler(requestPayload) : requestPayload
      );
      this.clearOperation(operationId);
    } catch (e) {
      const eResponse = this.getResponseFactory(req).makeErrorResponse(e);
      if (eResponse.message === this.cancelUuid) {
        throw {
          ...eResponse,
          message: this.settings.messages.requestCancelErrorMessage,
          cancelled: true,
        };
      } else {
        // Does not need to remove canceled operation because the next request does clear it
        this.clearOperation(operationId);
      }
      throw eResponse;
    }
    return this.getResponseFactory(req).makeResponse(req, res);
  }

  /**
   * @stable [07.02.2019]
   * @param {ITransportRequestEntity} req
   */
  public cancelRequest(req: ITransportRequestEntity): void {
    const operationId = this.toOperationId(req);
    const cancelToken = this.operationsIdsMap.get(operationId);
    if (cancelToken) {
      cancelToken.cancel(this.cancelUuid);
      this.clearOperation(operationId);
    }
  }

  /**
   * @stable [01.02.2019]
   * @param {string} operationId
   */
  private clearOperation(operationId?: string): void {
    if (R.isNil(operationId)) {
      return;
    }
    this.operationsIdsMap.delete(operationId);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportResponseFactory}
   */
  private getResponseFactory(req: ITransportRequestEntity): ITransportResponseFactory {
    return req.responseFactory || this.responseFactory;
  }

  /**
   * @stable [07.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {string}
   */
  private toOperationId(req: ITransportRequestEntity): string {
    return ifNotNilThanValue(req.operation, (operation) => operation.id);
  }
}
