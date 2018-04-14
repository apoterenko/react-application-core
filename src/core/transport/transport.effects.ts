import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';

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
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { RouterActionBuilder } from '../router';
import { IRoutesConfiguration } from '../configurations-definitions.interface';

@provideInSingleton(TransportEffects)
export class TransportEffects {

  @lazyInject(DI_TYPES.TransportPayloadAnalyzer)
  private transportPayloadAnalyzer: IApplicationTransportPayloadAnalyzer;
  @lazyInject(DI_TYPES.TransportErrorInterceptor)
  private transportErrorInterceptor: IApplicationTransportErrorInterceptor;
  @lazyInject(DI_TYPES.Routes) private routes: IRoutesConfiguration;

  @EffectsService.effects(TRANSPORT_REQUEST_DONE_ACTION_TYPE)
  public onTransportRequestDone(action: IEffectsAction): IEffectsAction {
    const data: ITransportResponsePayload = action.data;
    const token = this.transportPayloadAnalyzer.toToken(data);
    if (token) {
      return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, { token });
    }
    return null;
  }

  @EffectsService.effects(TRANSPORT_REQUEST_ERROR_ACTION_TYPE)
  public onTransportRequestError(action: IEffectsAction): IEffectsAction[]|IEffectsAction {
    const data: ITransportResponsePayload = action.data;
    if (this.transportPayloadAnalyzer.isAuthErrorPayload(data)) {
      return [
        ApplicationActionBuilder.buildDestroyTokenAction(),
        RouterActionBuilder.buildNavigateAction(this.routes.logout)
      ];
    }
    return this.transportErrorInterceptor.intercept(data);
  }
}
