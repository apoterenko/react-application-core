import { IEffectsAction } from 'redux-effects-promise';

import {
  IKeyValue,
  INameWrapper,
  IBlobWrapper,
  IPathWrapper,
  INoCacheWrapper,
  IUrlWrapper,
  INoAuthWrapper,
  ITokenWrapper,
  IOperationWrapper,
  AnyT,
  IParamsWrapper,
  IOperationIdWrapper,
  IFormDataWrapper,
  IReaderWrapper,
} from '../definitions.interface';
import {
  ITransportFactoryResponseEntity,
  ITransportFactory,
} from './factory';
import { IBaseTransportRequestEntity } from '../entities-definitions.interface';
import { ITransportResponseFactory } from './response';
import { ITransportRequestPayloadDataFactory } from './request';

export interface ITransportTokenAccessor extends ITokenWrapper {
}

export interface ITransportCancelTokenEntity {
  token: string;
  cancel(message?: string): void;
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

export interface IApplicationTransportPayloadAnalyzer {
  isAuthErrorPayload(payload: any): boolean; // TODO
  toToken(payload: any): string;
}

export interface IApplicationTransportErrorInterceptor {
  intercept(payload: any): IEffectsAction[]|IEffectsAction;
}

/**
 * @stable [01.02.2019]
 */
export interface ITransportRequestMetaEntity
  extends INameWrapper,
          IOperationIdWrapper {
}

/**
 * @stable [01.02.2019]
 */
export interface ITransportResponseEntity
  extends ITransportRequestMetaEntity,
          ITransportFactoryResponseEntity {
}

/**
 * @stable [02.02.2019]
 */
export interface ITransportRequestEntity
  extends IBaseTransportRequestEntity,
          IBlobWrapper,
          IFormDataWrapper,
          INameWrapper,
          INoAuthWrapper,
          IParamsWrapper,
          IPathWrapper,
          INoCacheWrapper,
          IUrlWrapper,
          IReaderWrapper<(response) => AnyT>,
          IOperationWrapper {
  transportFactory?: ITransportFactory;
  responseFactory?: ITransportResponseFactory;
}

/**
 * @stable [02.02.2019]
 */
export interface ICancelableTransport {
  cancelRequest(operationId: string): void;
}

/**
 * @stable [02.02.2019]
 */
export interface ITransport extends ICancelableTransport,
                                    ITransportRequestPayloadDataFactory {
  request<TResponse>(req: ITransportRequestEntity): Promise<TResponse>;
}
