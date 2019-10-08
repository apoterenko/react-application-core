import { injectable } from 'inversify';
import * as R from 'ramda';

import { ISettingsEntity } from '../../settings';
import {
  ITransportCancelTokenEntity,
  ITransportFactory,
  ITransportRequestEntity,
  ITransportRequestPayloadFactory,
  ITransportRequestProvider,
  ITransportResponseFactory,
  ITransportResponseFactoryEntity,
} from '../../definition';
import { lazyInject, DI_TYPES } from '../../di';
import { uuid, ifNotNilThanValue, isFn, nvl } from '../../util';

@injectable()
export class TransportFactory implements ITransportFactory {
  private readonly cancelUuid = uuid();
  private readonly operationsIdsMap = new Map<string, ITransportCancelTokenEntity>();
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.TransportRequestProvider) private readonly requestProvider: ITransportRequestProvider;
  @lazyInject(DI_TYPES.TransportRequestPayloadFactory) private readonly requestPayloadFactory: ITransportRequestPayloadFactory;
  @lazyInject(DI_TYPES.TransportResponseFactory) private readonly responseFactory: ITransportResponseFactory;

  /**
   * @stable [11.08.2019]
   * @param {ITransportRequestEntity} req
   * @param {(payload: ITransportRequestEntity) => ITransportRequestEntity} requestPayloadHandler
   * @returns {Promise<ITransportResponseFactoryEntity>}
   */
  public async request(req: ITransportRequestEntity,
                       requestPayloadHandler?: (payload: ITransportRequestEntity) => ITransportRequestEntity): Promise<ITransportResponseFactoryEntity> {
    let cancelTokenEntity: ITransportCancelTokenEntity;
    const operationId = this.toOperationId(req);
    const requestProvider = this.getRequestProvider(req);
    if (operationId) {
      cancelTokenEntity = requestProvider.provideCancelToken();
      if (cancelTokenEntity) {
        this.operationsIdsMap.set(operationId, cancelTokenEntity);
      }
    }
    let res;
    const requestPayload = this.requestPayloadFactory.makeRequestPayload(req, cancelTokenEntity);
    try {
      res = await requestProvider.provideRequest(
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
        // Does not need to remove canceled operation because the next request will clear it
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
    return nvl(req.responseFactory, this.responseFactory);
  }

  /**
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportRequestProvider}
   */
  private getRequestProvider(req: ITransportRequestEntity): ITransportRequestProvider {
    return nvl(req.requestProvider, this.requestProvider);
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
