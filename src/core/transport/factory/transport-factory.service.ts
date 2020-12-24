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
import {
  NvlUtils,
  TypeUtils,
  UuidUtils,
} from '../../util';

@injectable()
export class TransportFactory implements ITransportFactory {
  private readonly cancelUuid = UuidUtils.uuid();
  private readonly operationsIdsMap = new Map<string, ITransportCancelTokenEntity>();

  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.TransportRequestPayloadFactory) private readonly requestPayloadFactory: ITransportRequestPayloadFactory;
  @lazyInject(DI_TYPES.TransportRequestProvider) private readonly requestProvider: ITransportRequestProvider;
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
    const operationId = this.asOperationId(req);
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
        TypeUtils.isFn(requestPayloadHandler)
          ? requestPayloadHandler(requestPayload)
          : requestPayload
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
   * @stable [24.12.2020]
   * @param req
   */
  public cancelRequest(req: ITransportRequestEntity): void {
    const operationId = this.asOperationId(req);
    const cancelToken = this.operationsIdsMap.get(operationId);

    if (cancelToken) {
      cancelToken.cancel(this.cancelUuid);
      this.clearOperation(operationId);
    }
  }

  /**
   * @stable [24.12.2020]
   * @param operationId
   * @private
   */
  private clearOperation(operationId?: string): void {
    if (R.isNil(operationId)) {
      return;
    }
    this.operationsIdsMap.delete(operationId);
  }

  /**
   * @stable [24.12.2020]
   * @param req
   * @private
   */
  private getResponseFactory(req: ITransportRequestEntity): ITransportResponseFactory {
    return NvlUtils.nvl(req.responseFactory, this.responseFactory);
  }

  /**
   * @stable [24.12.2020]
   * @param req
   * @private
   */
  private getRequestProvider(req: ITransportRequestEntity): ITransportRequestProvider {
    return NvlUtils.nvl(req.requestProvider, this.requestProvider);
  }

  /**
   * @stable [24.12.2020]
   * @param req
   * @private
   */
  private asOperationId(req: ITransportRequestEntity): string {
    return req.operation?.id;
  }
}
