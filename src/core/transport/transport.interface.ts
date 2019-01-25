import { IEffectsAction } from 'redux-effects-promise';

import {
  IKeyValue,
  IStringTokenWrapper,
  INameWrapper,
  IBlobWrapper,
  IMethodWrapper,
  IPathWrapper,
  INoCacheWrapper,
  IUrlWrapper,
  IKeyValueHeadersWrapper,
  IDataWrapper,
  INotApplyAuthWrapper,
  IStringAuthWrapper,
  IOperationWrapper,
  IReaderFnWrapper,
  IResultWrapper,
  IIdWrapper,
  AnyT,
  IOperationIdWrapper,
  IWithCredentialsWrapper,
  IParamsWrapper,
} from '../definitions.interface';
import { IErrorEntity } from '../entities-definitions.interface';

export interface IApplicationTransportTokenAccessor extends IStringTokenWrapper {
}

export interface IRequestParamsConverterTransport {
  toRequestParams(req: ITransportRequestEntity): ITransportRequestParamsEntity;
}

export interface ICancelableTransport {
  cancelRequest(operationId: string): void;
}

export interface IApplicationTransportRequestFactory {
  cancelToken?: IApplicationTransportCancelToken;
  request<TRequest, TResponse>(req: TRequest): Promise<TResponse>;
}

export interface IApplicationTransport extends ICancelableTransport,
                                               IRequestParamsConverterTransport {
  request<TResponse>(req: ITransportRequestEntity): Promise<TResponse>;
}

export interface IApplicationTransportFactory extends ICancelableTransport,
                                                      IRequestParamsConverterTransport {
  request(req: ITransportRequestEntity): Promise<ITransportRawResponse>;
}

/**
 * Transport raw request
 */
export interface ITransportHttpRequestEntity extends IMethodWrapper,
                                                     IKeyValueHeadersWrapper,
                                                     IUrlWrapper,
                                                     IWithCredentialsWrapper,
                                                     IDataWrapper<Blob|ITransportRequestParamsEntity|FormData> {
  cancelToken?: string;
}

export interface ITransportRequestEntity extends INameWrapper,
                                                 INotApplyAuthWrapper,
                                                 IParamsWrapper,
                                                 IBlobWrapper,
                                                 IMethodWrapper,
                                                 IPathWrapper,
                                                 IReaderFnWrapper<AnyT, IResultWrapper>,
                                                 INoCacheWrapper,
                                                 IUrlWrapper,
                                                 IOperationWrapper {
  formData?: FormData; // TODO
}

export interface ITransportRequestParamsEntity extends INameWrapper,
                                                       INotApplyAuthWrapper,
                                                       IParamsWrapper,
                                                       IStringAuthWrapper,
                                                       IIdWrapper {
}

export interface IApplicationTransportCancelToken {
  token: string;
  cancel(message?: string): void;
}

/**
 * @stable [17.08.2018]
 */
export interface ITransportErrorEntity extends IErrorEntity<TransportResponseErrorT> {
}

/**
 * @stable [17.08.2018]
 */
export interface ITransportResponseEntity extends INameWrapper,
                                                  IResultWrapper,
                                                  IOperationIdWrapper,
                                                  ITransportErrorEntity {
}

/**
 * @stable [17.08.2018]
 */
export const TRANSPORT_REQUEST_CANCEL_REASON = 'TRANSPORT_REQUEST_CANCEL_REASON';

export interface ITransportRawResponse {
  data: ITransportRawResponseData;
  status?: number;
  statusText?: string;
  headers?: IKeyValue;
  request?: XMLHttpRequest;
}

export interface ITransportRawResponseData extends IIdWrapper,
                                                   IResultWrapper,
                                                   IErrorEntity<ITransportRawResponseError> {
  Message?: string;
}

export interface ITransportRawErrorResponse {
  statusText?: string;
  status?: number;
}

export interface ITransportRawResponseError {
  code: number;
  message: string;
  response?: ITransportRawErrorResponse;
  data?: IKeyValue;
}

export type TransportResponseErrorT = Error | string | ITransportRawResponseError;

export interface IApplicationTransportPayloadAnalyzer {
  isAuthErrorPayload(payload: ITransportErrorEntity): boolean;
  toToken(payload: ITransportErrorEntity): string;
}

export interface IApplicationTransportErrorInterceptor {
  intercept(payload: ITransportErrorEntity): IEffectsAction[]|IEffectsAction;
}
