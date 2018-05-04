import { IEffectsAction } from 'redux-effects-promise';

import {
  IKeyValue,
  IStringTokenWrapper,
  INameWrapper,
  IBlobWrapper,
  IMethodWrapper,
  IStringPathWrapper,
  INumberIdWrapper,
  IKeyValueParamsWrapper,
  INoCacheWrapper,
  IUrlWrapper,
  IKeyValueHeadersWrapper,
  IDataWrapper,
  INotApplyAuthWrapper,
  IStringAuthWrapper,
  IDefaultOperationWrapper,
  IFnReaderWrapper,
  IAnyResultWrapper,
  AnyT,
} from '../definitions.interface';
import { IErrorEntity } from '../entities-definitions.interface';

export interface IApplicationTransportTokenAccessor extends IStringTokenWrapper {
}

export interface ICancelableTransport {
  cancelRequest(operationId: string): void;
}

export interface IApplicationTransportRequestFactory {
  cancelToken?: IApplicationTransportCancelToken;
  request<TRequest, TResponse>(req: TRequest): Promise<TResponse>;
}

export interface IApplicationTransport extends ICancelableTransport {
  request<TResponse>(req: ITransportRequestEntity): Promise<TResponse>;
}

export interface IApplicationTransportFactory extends ICancelableTransport {
  request(req: ITransportRequestEntity): Promise<ITransportRawResponse>;
}

/**
 * Transport raw request
 */
export interface ITransportHttpRequestEntity extends IMethodWrapper,
                                                     IKeyValueHeadersWrapper,
                                                     IUrlWrapper,
                                                     IDataWrapper<Blob|ITransportRequestParamsEntity> {
  cancelToken?: string;
}

export interface ITransportRequestEntity extends INameWrapper,
                                                 INotApplyAuthWrapper,
                                                 IKeyValueParamsWrapper,
                                                 IBlobWrapper,
                                                 IMethodWrapper,
                                                 IStringPathWrapper,
                                                 IFnReaderWrapper<AnyT, IAnyResultWrapper>,
                                                 INoCacheWrapper,
                                                 IUrlWrapper,
                                                 IDefaultOperationWrapper {
}

export interface ITransportRequestParamsEntity extends INameWrapper,
                                                       INotApplyAuthWrapper,
                                                       IKeyValueParamsWrapper,
                                                       IStringAuthWrapper,
                                                       INumberIdWrapper {
}

export interface IApplicationTransportCancelToken {
  token: string;
  cancel(message?: string): void;
}

export interface ITransportErrorPayload extends IErrorEntity<TransportResponseErrorT> {
}

export interface ITransportResponsePayload extends INameWrapper,
                                                   IAnyResultWrapper,
                                                   ITransportErrorPayload {
  operationId?: string;
}

export interface ITransportRawResponse {
  data: ITransportRawResponseData;
  status?: number;
  statusText?: string;
  headers?: IKeyValue;
  request?: XMLHttpRequest;
}

export interface ITransportRawResponseData extends INumberIdWrapper,
                                                   IAnyResultWrapper,
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
  isAuthErrorPayload(payload: ITransportErrorPayload): boolean;
  toToken(payload: ITransportErrorPayload): string;
}

export interface IApplicationTransportErrorInterceptor {
  intercept(payload: ITransportErrorPayload): IEffectsAction[]|IEffectsAction;
}
