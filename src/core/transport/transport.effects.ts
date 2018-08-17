import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import {
  IApplicationTransportPayloadAnalyzer,
  IApplicationTransportErrorInterceptor,
  ITransportResponseEntity,
} from './transport.interface';
import {
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
  TRANSPORT_REQUEST_DONE_ACTION_TYPE,
  TRANSPORT_UPDATE_TOKEN_ACTION_TYPE,
} from './transport-reducer.interface';
import { RouterActionBuilder } from '../router/router-action.builder';
import { IRoutesConfiguration } from '../configurations-definitions.interface';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';

@provideInSingleton(TransportEffects)
export class TransportEffects {
  private static logger = LoggerFactory.makeLogger(TransportEffects);

  @lazyInject(DI_TYPES.TransportPayloadAnalyzer) private payloadAnalyzer: IApplicationTransportPayloadAnalyzer;
  @lazyInject(DI_TYPES.TransportErrorInterceptor) private errorInterceptor: IApplicationTransportErrorInterceptor;
  @lazyInject(DI_TYPES.Routes) private routes: IRoutesConfiguration;

  @EffectsService.effects(TRANSPORT_REQUEST_DONE_ACTION_TYPE)
  public $onTransportRequestDone(action: IEffectsAction): IEffectsAction {
    const data: ITransportResponseEntity = action.data;
    const token = this.payloadAnalyzer.toToken(data);
    if (token) {
      return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, { token });
    }
    return null;
  }

  @EffectsService.effects(TRANSPORT_REQUEST_ERROR_ACTION_TYPE)
  public $onTransportRequestError(action: IEffectsAction,
                                  storeEntity: IUniversalApplicationStoreEntity): IEffectsAction[] | IEffectsAction {
    const data: ITransportResponseEntity = action.data;
    if (this.payloadAnalyzer.isAuthErrorPayload(data)) {
      const actions = [
        ApplicationActionBuilder.buildUnauthorizedAction()
      ];

      if (storeEntity.application.ready) {
        actions.push(RouterActionBuilder.buildNavigateAction(this.routes.logout));

        TransportEffects.logger.debug(() =>
          `[$TransportEffects][$onTransportRequestError] An auth error has occurred and the app is ready therefore ` +
          `need to redirect to logout. Actions: ${JSON.stringify(actions)}. Data: ${JSON.stringify(data)}`);
      } else {
        TransportEffects.logger.debug(() =>
          `[$TransportEffects][$onTransportRequestError] An auth error has occurred and the app is NOT ready. ` +
          `Actions: ${JSON.stringify(actions)}. Data: ${JSON.stringify(data)}`);
      }
      return actions;
    }
    return this.errorInterceptor.intercept(data);
  }
}
