import { injectable } from 'inversify';
import * as R from 'ramda';

import { lazyInject, DI_TYPES } from '../../di';
import { uuid } from '../../util';
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
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {Promise<ITransportFactoryResponseEntity>}
   */
  public async request(req: ITransportRequestEntity): Promise<ITransportFactoryResponseEntity> {
    let cancelTokenEntity: ITransportCancelTokenEntity;
    const operationId = req.operation && req.operation.id;
    if (operationId) {
      cancelTokenEntity = this.requestProvider.provideCancelToken();
      if (cancelTokenEntity) {
        this.operationsIdsMap.set(operationId, cancelTokenEntity);
      }
    }
    let res;
    const requestPayload = this.requestPayloadFactory.makeRequestPayload(req, cancelTokenEntity);
    try {
      res = await this.requestProvider.provideRequest(requestPayload);
    } catch (e) {
      const eResponse = this.getResponseFactory(req).makeErrorResponse(e);
      if (eResponse.message === this.cancelUuid) {
        throw {
          ...eResponse,
          message: this.settings.messages.requestCancelErrorMessage,
          cancelled: true,
        };
      }
      throw eResponse;
    } finally {
      this.clearOperation(operationId);
    }
    return this.getResponseFactory(req).makeResponse(req, res);
  }

  /**
   * @stable [01.02.2019]
   * @param {string} operationId
   */
  public cancelRequest(operationId: string): void {
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
}
