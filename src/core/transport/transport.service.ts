import { Store } from 'redux';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, lazyInject } from '../di';
import { notNilValuesFilter, ifNotNilThanValue, toType } from '../util';
import { IKeyValue } from '../definitions.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';
import {
  ITransport,
  ITransportRequestEntity,
  ITransportResponseEntity,
  ITransportRequestMetaEntity,
} from './transport.interface';
import {
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
} from './transport-reducer.interface';
import { ITransportFactoryResponseEntity, ITransportFactory } from './factory';
import { ITransportRequestPayloadFactory } from './request';

@injectable()
export class Transport implements ITransport {
  private static readonly logger = LoggerFactory.makeLogger('Transport');

  @lazyInject(DI_TYPES.Store) private store: Store<IApplicationStoreEntity>;
  @lazyInject(DI_TYPES.TransportFactory) private transportFactory: ITransportFactory;
  @lazyInject(DI_TYPES.TransportRequestPayloadFactory) private readonly requestPayloadFactory: ITransportRequestPayloadFactory;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  public makeRequestPayloadData(requestEntity: ITransportRequestEntity): IKeyValue {
    return this.requestPayloadFactory.makeRequestPayloadData(requestEntity);
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {Promise<TResponse>}
   */
  public async request<TResponse>(req: ITransportRequestEntity): Promise<TResponse> {
    this.cancelRequest(req); // Try cancel the same request automatically
    this.store.dispatch({type: TRANSPORT_REQUEST_ACTION_TYPE, data: this.toRequestMetaEntity(req)});

    let responseEntity: ITransportFactoryResponseEntity;
    try {
      responseEntity = await this.getTransportFactory(req).request(req);
    } catch (e) {
      if (e.cancelled) {
        Transport.logger.debug('[$Transport][request] A user has canceled the request:', e);
        this.onRequestCancel(req);
        return null;
      } else {
        Transport.logger.error('[$Transport][request] The system error has occurred:', e);
        this.onRequestError(req, e);
        throw e;
      }
    }
    if (responseEntity.error) {
      Transport.logger.warn('[$Transport][request] The business logic error has occurred:', responseEntity);
      this.onRequestError(req, responseEntity);
      throw responseEntity;
    } else {
      this.onRequestDone(req, responseEntity);
      return responseEntity.result;
    }
  }

  /**
   * @stable [07.02.2019]
   * @param {ITransportRequestEntity} req
   */
  public cancelRequest(req: ITransportRequestEntity): void {
    this.getTransportFactory(req).cancelRequest(req);
  }

  /**
   * @stable [17.08.2018]
   * @param {ITransportRequestEntity} req
   */
  private onRequestCancel(req: ITransportRequestEntity): void {
    this.store.dispatch({type: TRANSPORT_REQUEST_CANCEL_ACTION_TYPE, data: this.toRequestMetaEntity(req)});
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @param {ITransportResponseEntity} responseEntity
   */
  private onRequestError(req: ITransportRequestEntity, responseEntity: ITransportResponseEntity): void {
    this.store.dispatch({
      type: TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
      data: toType<ITransportResponseEntity>({
        ...this.toRequestMetaEntity(req),
        ...responseEntity,
      }),
    });
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @param {ITransportResponseEntity} responseEntity
   */
  private onRequestDone(req: ITransportRequestEntity, responseEntity: ITransportResponseEntity): void {
    this.store.dispatch({
      type: TRANSPORT_REQUEST_DONE_ACTION_TYPE,
      data: toType<ITransportResponseEntity>({
        ...this.toRequestMetaEntity(req),
        ...responseEntity,
      }),
    });
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportRequestMetaEntity}
   */
  private toRequestMetaEntity(req: ITransportRequestEntity): ITransportRequestMetaEntity {
    return notNilValuesFilter<ITransportRequestMetaEntity, ITransportRequestMetaEntity>({
      name: req.name,
      operationId: this.toOperationId(req),
    });
  }

  /**
   * @stable [07.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {string}
   */
  private toOperationId(req: ITransportRequestEntity): string {
    return ifNotNilThanValue(req.operation, (operation) => operation.id);
  }

  /**
   * @stable [07.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportFactory}
   */
  private getTransportFactory(req: ITransportRequestEntity): ITransportFactory {
    return req.transportFactory || this.transportFactory;
  }
}
