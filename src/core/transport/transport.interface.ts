import { IEffectsAction } from 'redux-effects-promise';

import {
  AnyT,
  IKeyValue,
  IErrorable,
  IStringTokenWrapper,
  INameWrapper,
  IBlobWrapper,
  IMethodWrapper,
  IPathWrapper,
  INumberIdWrapper,
  IParamsWrapper,
  INoCacheWrapper,
  IStringUrlWrapper,
  IHeadersWrapper,
  IDataWrapper,
  INoAuthWrapper,
  IAuthWrapper,
  IDefaultOperationWrapper,
} from '../definition.interface';

export interface IApplicationTransportState extends IStringTokenWrapper {
  queue: string[];
}

export interface IApplicationTransportTokenAccessor extends IStringTokenWrapper {
}

export interface IApplicationTransportWrapperState {
  transport: IApplicationTransportState;
}

export const INITIAL_APPLICATION_TRANSPORT_STATE: IApplicationTransportState = {
  queue: [],
  token: null,
};

export interface ICancelableTransport {
  cancelRequest(operationId: string): void;
}

export interface IApplicationTransportRequestFactory {
  cancelToken?: IApplicationTransportCancelToken;
  request<TRequest, TResponse>(req: TRequest): Promise<TResponse>;
}

export interface IApplicationTransport extends ICancelableTransport {
  request<TResponse>(req: ITransportRequest): Promise<TResponse>;
}

export interface IApplicationTransportFactory extends ICancelableTransport {
  request(req: ITransportRequest): Promise<ITransportRawResponse>;
}

/**
 * Transport raw request
 */
export interface ITransportRawRequest extends IMethodWrapper,
                                              IHeadersWrapper,
                                              IStringUrlWrapper,
                                              IDataWrapper<Blob|ITransportRequestData> {
  cancelToken?: string;
}

/**
 * Transport request
 */
export interface ITransportRequest extends INameWrapper,
                                           INoAuthWrapper,
                                           IParamsWrapper,
                                           IBlobWrapper,
                                           IMethodWrapper,
                                           IPathWrapper,
                                           INoCacheWrapper,
                                           IStringUrlWrapper,
                                           IDefaultOperationWrapper {
}

/**
 * Transport request data
 */
export interface ITransportRequestData extends INameWrapper,
                                               INoAuthWrapper,
                                               IParamsWrapper,
                                               IAuthWrapper,
                                               INumberIdWrapper {
}

export interface IApplicationTransportCancelToken {
  token: string;
  cancel(message?: string): void;
}

export interface ITransportResultPayload {
  result?: AnyT;
}

export interface ITransportErrorPayload extends IErrorable<TransportResponseErrorT> {
}

export interface ITransportResponsePayload extends INameWrapper,
                                                   ITransportResultPayload,
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
                                                   ITransportResultPayload,
                                                   IErrorable<ITransportRawResponseError> {
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

export const TRANSPORT_REQUEST_ACTION_TYPE = 'transport.request';
export const TRANSPORT_DESTROY_ACTION_TYPE = 'transport.destroy';
export const TRANSPORT_DESTROY_TOKEN_ACTION_TYPE = 'transport.destroy.token';
export const TRANSPORT_UPDATE_TOKEN_ACTION_TYPE = 'transport.update.token';
export const TRANSPORT_REQUEST_DONE_ACTION_TYPE = 'transport.request.done';
export const TRANSPORT_REQUEST_ERROR_ACTION_TYPE = 'transport.request.error';
