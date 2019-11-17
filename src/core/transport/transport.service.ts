import { Store } from 'redux';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, lazyInject } from '../di';
import { notNilValuesFilter, ifNotNilThanValue, toType, coalesce } from '../util';
import { IKeyValue } from '../definitions.interface';
import {
  TRANSPORT_REQUEST_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_REQUEST_CANCEL_ACTION_TYPE,
} from './transport-reducer.interface';
import {
  EnvironmentGlobalVariablesEnum,
  IEnvironment,
  ILogManager,
  ITransport,
  ITransportFactory,
  ITransportRequestEntity,
  ITransportRequestPayloadFactory,
  ITransportResponseEntity,
  ITransportResponseFactoryEntity,
  IUniversalStoreEntity,
  TransportEventCategoriesEnum,
} from '../definition';

@injectable()
export class Transport implements ITransport {
  private static readonly logger = LoggerFactory.makeLogger('Transport');

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManager) private readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IUniversalStoreEntity>;
  @lazyInject(DI_TYPES.TransportFactory) private readonly transportFactory: ITransportFactory;
  @lazyInject(DI_TYPES.TransportRequestPayloadFactory) private readonly requestPayloadFactory: ITransportRequestPayloadFactory;

  /**
   * @stable [26.02.2019]
   */
  constructor() {
    this.environment.setVariable(EnvironmentGlobalVariablesEnum.TRANSPORT, this);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  public makeRequestData(requestEntity: ITransportRequestEntity): IKeyValue {
    return this.requestPayloadFactory.makeRequestData(requestEntity);
  }

  /**
   * @stable [28.08.2019]
   * @param {ITransportRequestEntity} req
   * @returns {Promise<TResponse>}
   */
  public async request<TResponse>(req: ITransportRequestEntity): Promise<TResponse> {
    this.cancelRequest(req); // Try cancel the same request automatically
    this.store.dispatch({type: TRANSPORT_REQUEST_ACTION_TYPE, data: this.toResponseMetaEntity(req)});

    let responseFactoryEntity: ITransportResponseFactoryEntity;
    try {
      responseFactoryEntity = await this.getTransportFactory(req).request(
        req,
        (payload) =>
          (this.logManager.send(TransportEventCategoriesEnum.TRANSPORT, this.toLogEventName(req), payload), payload)
      );
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
    if (responseFactoryEntity.error) {
      Transport.logger.warn('[$Transport][request] The business logic error has occurred:', responseFactoryEntity);
      this.onRequestError(req, responseFactoryEntity);
      throw responseFactoryEntity;
    } else {
      this.onRequestDone(req, responseFactoryEntity);
      return responseFactoryEntity.result;
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
    this.store.dispatch({type: TRANSPORT_REQUEST_CANCEL_ACTION_TYPE, data: this.toResponseMetaEntity(req)});
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @param {ITransportResponseEntity} responseEntity
   */
  private onRequestError(req: ITransportRequestEntity, responseEntity: ITransportResponseEntity): void {
    this.logManager.send(TransportEventCategoriesEnum.TRANSPORT_ERROR, this.toLogEventName(req), responseEntity);

    this.store.dispatch({
      type: TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
      data: toType<ITransportResponseEntity>({
        ...this.toResponseMetaEntity(req),
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
        ...this.toResponseMetaEntity(req),
        ...responseEntity,
      }),
    });
  }

  /**
   * @stable [01.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportResponseEntity}
   */
  private toResponseMetaEntity(req: ITransportRequestEntity): ITransportResponseEntity {
    return notNilValuesFilter<ITransportResponseEntity, ITransportResponseEntity>({
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

  /**
   * @stable [11.08.2019]
   * @param {ITransportRequestEntity} req
   * @returns {string}
   */
  private toLogEventName(req: ITransportRequestEntity): string {
    return coalesce(req.name, req.path, req.url);
  }
}
