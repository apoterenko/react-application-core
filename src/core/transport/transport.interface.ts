import { IEffectsAction } from 'redux-effects-promise';

import { AnyT, IKeyValue, IOperationable, IErrorable, ITokenable } from '../definition.interface';

export interface IApplicationTransportState extends ITokenable<string> {
  queue: string[];
}

export interface IApplicationTransportTokenAccessor extends ITokenable<string> {
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

export interface IApplicationTransportRequest {
  url: string;
  method: string;
  data: AnyT;
  cancelToken?: string;
}

export interface IApplicationTransportCancelToken {
  token: string;
  cancel(message?: string): void;
}

export interface ITransportNamedPayload {
  name: string;
}

export interface ITransportNoAuthPayload {
  noAuth?: boolean;
}

export interface ITransportNoCachePayload {
  noCache?: boolean;
}

export interface ITransportIdPayload {
  id: number;
}

export interface ITransportParamsPayload {
  params?: IKeyValue;
}

export interface ITransportResultPayload {
  result?: AnyT;
}

export interface ITransportErrorPayload extends IErrorable<TransportResponseErrorT> {
}

export interface ITransportResponsePayload extends ITransportNamedPayload,
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

export interface ITransportRawResponseData extends ITransportResultPayload,
                                                   ITransportIdPayload,
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

export interface ITransportRawRequest extends ITransportNamedPayload,
                                              ITransportParamsPayload,
                                              ITransportIdPayload,
                                              ITransportNoAuthPayload {
  auth?: string;
}

export interface ITransportRequest extends ITransportNamedPayload,
                                           ITransportParamsPayload,
                                           ITransportNoAuthPayload,
                                           ITransportNoCachePayload,
                                           IOperationable {
}

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
