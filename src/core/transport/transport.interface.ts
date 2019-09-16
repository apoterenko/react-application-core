import { IEffectsAction } from 'redux-effects-promise';

import {
  IKeyValue,
} from '../definitions.interface';

// TODO Refactoring
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

export interface IApplicationTransportErrorInterceptor {
  intercept(payload: any): IEffectsAction[]|IEffectsAction;
}
