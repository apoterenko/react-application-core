import {
  AnyT,
  EntityIdT,
  IApiUrlWrapper,
  IAuthWrapper,
  IBlobDataContentTypeWrapper,
  IBlobDataWrapper,
  IBlobResponseWrapper,
  ICancelTokenWrapper,
  ICodeWrapper,
  IDataProviderWrapper,
  IDataWrapper,
  IDateNowWrapper,
  IEntityWrapper,
  IErrorWrapper,
  IFormDataContentTypeWrapper,
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
  IQueueWrapper,
  IRequestDataFactoryWrapper,
  IRequestProviderWrapper,
  IResponseFactoryWrapper,
  IResponseReaderWrapper,
  IResponseTypeWrapper,
  IResultWrapper,
  ISettingsWrapper,
  IStatusTextWrapper,
  IStatusWrapper,
  ITokenWrapper,
  ITransportFactoryWrapper,
  ITransportWrapper,
  IUniqueParamNameWrapper,
  IUploadUrlWrapper,
  IUrlFactoryWrapper,
  IUrlProviderWrapper,
  IUrlWrapper,
  IWithCredentialsWrapper,
} from '../definitions.interface';

/**
 * @stable [15.09.2019]
 */
export enum TransportEventCategoriesEnum {
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
    IResponseReaderWrapper<(response: AnyT) => AnyT>,
    IOperationWrapper,
    IRequestProviderWrapper<ITransportRequestProvider>,
    IResponseFactoryWrapper<ITransportResponseFactory>,
    ITransportFactoryWrapper<ITransportFactory>,
    IUrlFactoryWrapper<(request: ITransportRequestEntity) => string>,
    IRequestDataFactoryWrapper<ITransportRequestDataFactory> {
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
 * Transport request data factory
 *
 * @TransportRequest
 * @stable [15.09.2019]
 */
export interface ITransportRequestDataFactory {
  makeRequestData(req: ITransportRequestEntity): IKeyValue;
}

/**
 * Transport request payload factory
 *
 * @TransportRequest
 * @stable [16.09.2019]
 */
export interface ITransportRequestPayloadFactory extends ITransportRequestDataFactory {
  makeRequestPayload(requestEntity: ITransportRequestEntity,
                     cancelToken?: ITransportCancelTokenEntity): ITransportRequestPayloadEntity;
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
 * @TransportSettingsEntity
 * @stable [16.09.2019]
 */
export interface ITransportSettingsEntity
  extends IBaseTransportRequestEntity,
    IBlobDataContentTypeWrapper,
    IFormDataContentTypeWrapper,
    IUniqueParamNameWrapper,
    IApiUrlWrapper,
    IUploadUrlWrapper {
}

/**
 * Transport url config entity
 *
 * @TransportUrl
 * @stable [16.09.2019]
 */
export interface ITransportUrlConfigEntity
  extends IEntityWrapper<ITransportRequestEntity>,
    IUrlProviderWrapper<(requestEntity: ITransportRequestEntity) => string>,
    ISettingsWrapper<ITransportSettingsEntity>,
    IDataProviderWrapper<(requestEntity: ITransportRequestEntity) => IKeyValue>,
    IDateNowWrapper {
}

/**
 * Transport token accessor
 *
 * @TransportToken
 * @stable [16.09.2019]
 */
export interface ITransportTokenAccessor
  extends ITokenWrapper {
}

/**
 * @stable [24.09.2019]
 */
export interface ITransportEntity
  extends ITokenWrapper,
    IQueueWrapper<string[]> {
}

/**
 * @stable [24.09.2019]
 */
export interface ITransportWrapperEntity
  extends ITransportWrapper<ITransportEntity> {
}

/**
 * @stable [24.09.2019]
 */
export const INITIAL_TRANSPORT_ENTITY = Object.freeze<ITransportEntity>({
  queue: [],
  token: null,
});
