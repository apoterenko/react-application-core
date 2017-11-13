import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { BaseEffects } from '../store';
import { IRoutes } from '../router';
import {
  IApplicationTransportPayloadAnalyzer,
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  ITransportResponsePayload,
} from './transport.interface';

@provideInSingleton(TransportEffects)
export class TransportEffects extends BaseEffects<{}> {

  @lazyInject(DI_TYPES.TransportPayloadAnalyzer)
  private transportPayloadAnalyzer: IApplicationTransportPayloadAnalyzer;
  @lazyInject(DI_TYPES.Routes) private routes: IRoutes;

  @EffectsService.effects(TRANSPORT_REQUEST_ERROR_ACTION_TYPE)
  public onTransportRequestError(action: IEffectsAction): IEffectsAction[] {
    const data: ITransportResponsePayload = action.data;
    if (this.transportPayloadAnalyzer.isAuthErrorPayload(data)) {
      return [
        this.buildApplicationDestroyTokenAction(),
        this.buildRouterNavigateAction(this.routes.logout)
      ];
    }
    return null;
  }
}
