import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import {
  IApplicationTransportPayloadAnalyzer,
  IApplicationTransportErrorInterceptor,
  ITransportResponsePayload,
} from './transport.interface';
import {
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
} from './transport-reducer.interface';
import { RouterActionBuilder } from '../router/router-action.builder';
import { IRoutesConfiguration } from '../configurations-definitions.interface';

@provideInSingleton(TransportEffects)
export class TransportEffects {
  private static logger = LoggerFactory.makeLogger(TransportEffects);

  @lazyInject(DI_TYPES.TransportPayloadAnalyzer) private payloadAnalyzer: IApplicationTransportPayloadAnalyzer;
  @lazyInject(DI_TYPES.TransportErrorInterceptor) private errorInterceptor: IApplicationTransportErrorInterceptor;
  @lazyInject(DI_TYPES.Routes) private routes: IRoutesConfiguration;

  @EffectsService.effects(TRANSPORT_REQUEST_DONE_ACTION_TYPE)
  public $onTransportRequestDone(action: IEffectsAction): IEffectsAction {
    const data: ITransportResponsePayload = action.data;
    const token = this.payloadAnalyzer.toToken(data);
    if (token) {
      return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, { token });
    }
    return null;
  }

  @EffectsService.effects(TRANSPORT_REQUEST_ERROR_ACTION_TYPE)
  public $onTransportRequestError(action: IEffectsAction): IEffectsAction[] | IEffectsAction {
    const data: ITransportResponsePayload = action.data;
    if (this.payloadAnalyzer.isAuthErrorPayload(data)) {
      TransportEffects.logger.debug(() =>
        `[$TransportEffects][$onTransportRequestError] There is an auth error. Navigate to logout. Data: ${
        JSON.stringify(data)}`);

      return RouterActionBuilder.buildNavigateAction(this.routes.logout);
    }
    return this.errorInterceptor.intercept(data);
  }
}
