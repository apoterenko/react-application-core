import { AnyT, IKeyValue } from '../definition.interface';
import { IOperation } from '../operation';

export interface IApplicationTransportState {
  token: string;
  queue: string[];
}

export const INITIAL_APPLICATION_TRANSPORT_STATE: IApplicationTransportState = {
  queue: [],
  token: null,
};

export interface ITransport {
  request<TResponse>(req: ITransportRequest): Promise<TResponse>;
  cancelRequest(operationId: string): void;
}

export interface IApplicationTransport extends ITransport {
}

export interface IApplicationTransportFactory extends ITransport {
}

export interface ITransportNamedPayload {
  name: string;
}

export interface ITransportNoAuthPayload {
  noAuth?: boolean;
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

export interface ITransportErrorPayload {
  error?: TransportResponseErrorT;
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
                                                   ITransportIdPayload {
  error?: ITransportRawResponseError;
  Message?: string;
}

export interface ITransportRawResponseError {
  code: number;
  message: string;
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
                                           ITransportNoAuthPayload {
  operation?: IOperation;
}

export interface IApplicationTransportPayloadAnalyzer {
  isAuthErrorPayload(payload: ITransportErrorPayload): boolean;
  toToken(payload: ITransportErrorPayload): string;
}

export const TRANSPORT_REQUEST_ACTION_TYPE = 'transport.request';
export const TRANSPORT_DESTROY_ACTION_TYPE = 'transport.destroy';
export const TRANSPORT_DESTROY_TOKEN_ACTION_TYPE = 'transport.destroy.token';
export const TRANSPORT_UPDATE_TOKEN_ACTION_TYPE = 'transport.update.token';
export const TRANSPORT_REQUEST_DONE_ACTION_TYPE = 'transport.request.done';
export const TRANSPORT_REQUEST_ERROR_ACTION_TYPE = 'transport.request.error';
