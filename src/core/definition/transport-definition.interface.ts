import {
  AnyT,
  EntityIdT,
  IAuthWrapper,
  IBlobDataWrapper,
  IBlobResponseWrapper,
  ICancelTokenWrapper,
  ICodeWrapper,
  IDataWrapper,
  IErrorWrapper,
  IFormDataWrapper,
  IHeadersWrapper,
  IIdWrapper,
  IKeyValue,
  IMessageWrapper,
  IMethodWrapper,
  INameWrapper,
  INoAuthWrapper,
  INoCacheWrapper,
  IOperationIdWrapper,
  IOperationWrapper,
  IParamsWrapper,
  IPathWrapper,
  IRequestProviderWrapper,
  IResponseFactoryWrapper,
  IResponseReaderWrapper,
  IResponseTypeWrapper,
  IResultWrapper,
  IStatusTextWrapper,
  IStatusWrapper,
  ITransportFactoryWrapper,
  IUrlWrapper,
  IWithCredentialsWrapper,
} from '../definitions.interface';

/**
 * @stable [15.09.2019]
 */
export enum TransportEventsEnum {
  TRANSPORT = 'transport',
  TRANSPORT_ERROR = 'transport:error',
}

/**
 * @stable [27.05.2019]
 */
export enum TransportMethodsEnum {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
}

/**
 * @stable [15.09.2019]
 */
export enum TransportResponseTypesEnum {
  BLOB = 'blob',
}

/**
 * Base transport request data entity
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface IBaseTransportRequestDataEntity
  extends INameWrapper,
    INoAuthWrapper,
    IParamsWrapper {
}

/**
 * Base transport request entity
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface IBaseTransportRequestEntity
  extends IWithCredentialsWrapper,
    IMethodWrapper,
    IHeadersWrapper {
}

/**
 * Transport request entity
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportRequestEntity
  extends IBaseTransportRequestEntity,
    IBaseTransportRequestDataEntity,
    IBlobDataWrapper,
    IFormDataWrapper,
    IPathWrapper,
    INoCacheWrapper,
    IUrlWrapper,
    IBlobResponseWrapper,
    IResponseReaderWrapper<(response) => AnyT>,
    IOperationWrapper,
    IRequestProviderWrapper<ITransportRequestProvider>,
    IResponseFactoryWrapper<ITransportResponseFactory>,
    ITransportFactoryWrapper<ITransportFactory> {
}

/**
 * Transport request payload entity. Is considered to be a provider request
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportRequestPayloadEntity
  extends IBaseTransportRequestEntity,
    IUrlWrapper,
    IDataWrapper<FormData | Blob | IKeyValue>,
    IResponseTypeWrapper,
    ICancelTokenWrapper {
}

/**
 * Transport JSON RPC request data entity
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportJsonRpcRequestDataEntity
  extends IBaseTransportRequestDataEntity,
    IAuthWrapper,
    IIdWrapper<EntityIdT> {
}

/**
 * Transport response factory entity
 *
 * @TransportResponse
 * @stable [16.09.2019]
 */
export interface ITransportResponseFactoryEntity
  extends IResultWrapper,
    IErrorWrapper,
    IMessageWrapper,
    IStatusTextWrapper,
    IStatusWrapper,
    ICodeWrapper<number> {
}

/**
 * Transport response entity
 *
 * @TransportResponse
 * @stable [16.09.2019]
 */
export interface ITransportResponseEntity
  extends ITransportResponseFactoryEntity,
    INameWrapper,
    IOperationIdWrapper {
}

/**
 * Transport response factory payload
 *
 * @TransportResponse
 * @stable [15.09.2019]
 */
export type TransportResponseFactoryPayloadT = IKeyValue | number | string | boolean;

/**
 * Transport response factory
 *
 * @TransportResponse
 * @stable [16.09.2019]
 */
export interface ITransportResponseFactory {
  makeResponse(req: ITransportRequestEntity,
               payloadEntity: TransportResponseFactoryPayloadT): ITransportResponseFactoryEntity;
  makeErrorResponse?(data: TransportResponseFactoryPayloadT): ITransportResponseFactoryEntity;
}

/**
 * Transport response accessor
 *
 * @TransportResponse
 * @stable [16.09.2019]
 */
export interface ITransportResponseAccessor {
  isAuthError(responseEntity: ITransportResponseEntity): boolean;
  toToken(payload: ITransportResponseEntity): string;
}

/**
 * Transport request data factory
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportRequestDataFactory {
  makeRequestData(req: ITransportRequestEntity): IKeyValue;
}

/**
 * Transport cancel token entity
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportCancelTokenEntity {
  token: string;
  cancel(message?: string): void;
}

/**
 * Transport request provider
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportRequestProvider {
  provideCancelToken?(): ITransportCancelTokenEntity;
  provideRequest<TRequest, TResponse>(req: TRequest): Promise<TResponse>;
}

/**
 * Transport factory
 *
 * @Transport
 * @stable [16.09.2019]
 */
export interface ITransportFactory
  extends ICancelableTransport {
  request(requestEntity: ITransportRequestEntity,
          requestPayloadHandler?: (payload: ITransportRequestEntity) => ITransportRequestEntity): Promise<ITransportResponseFactoryEntity>;
}

/**
 * Transport
 *
 * @Transport
 * @stable [02.02.2019]
 */
export interface ICancelableTransport {
  cancelRequest(req: ITransportRequestEntity): void;
}

/**
 * Transport
 *
 * @Transport
 * @stable [15.09.2019]
 */
export interface ITransport
  extends ICancelableTransport,
    ITransportRequestDataFactory {
  request<TResponse>(req: ITransportRequestEntity): Promise<TResponse>;
}

/**
 * Transport settings
 *
 * @TransportSettings
 * @stable [15.09.2019]
 */
export interface ITransportSettings
  extends IBaseTransportRequestEntity {
  binaryContentType?: string;
  formDataContentType?: string;
  uploadUrl?: string;
  apiUrl?: string;
  noCachePrefix?: string;  // TODO
}
