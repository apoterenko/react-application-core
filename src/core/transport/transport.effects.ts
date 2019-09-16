import { IEffectsAction, EffectsService, EffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { ITransportResponseEntity, ITransportResponseAccessor } from '../definition';
import { IApplicationTransportErrorInterceptor } from './transport.interface';
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
  private static logger = LoggerFactory.makeLogger('TransportEffects');

  @lazyInject(DI_TYPES.TransportResponseAccessor) private readonly responseAccessor: ITransportResponseAccessor;
  @lazyInject(DI_TYPES.TransportErrorInterceptor) private readonly errorInterceptor: IApplicationTransportErrorInterceptor;
  @lazyInject(DI_TYPES.Routes) private readonly routes: IRoutesConfiguration;

  @EffectsService.effects(TRANSPORT_REQUEST_DONE_ACTION_TYPE)
  public $onTransportRequestDone(action: IEffectsAction): IEffectsAction {
    const data = action.data;
    const token = this.responseAccessor.toToken(data);
    if (token) {
      return EffectsAction.create(TRANSPORT_UPDATE_TOKEN_ACTION_TYPE, { token });
    }
    return null;
  }

  /**
   * @stable [05.02.2019]
   * @param {IEffectsAction} action
   * @returns {IEffectsAction[] | IEffectsAction}
   */
  @EffectsService.effects(TRANSPORT_REQUEST_ERROR_ACTION_TYPE)
  public $onTransportRequestError(action: IEffectsAction): IEffectsAction[] | IEffectsAction {
    const data: ITransportResponseEntity = action.data;
    if (this.responseAccessor.isAuthError(data)) {
      /**
       * We should destroy the token and go to logout page
       */
      const actions = [
        ApplicationActionBuilder.buildUnauthorizedAction(),
        RouterActionBuilder.buildNavigateAction(this.routes.logout)
      ];

      TransportEffects.logger.debug(() =>
        `[$TransportEffects][$onTransportRequestError] An auth error has occurred. Need to redirect to logout. Data: ${
          JSON.stringify(data)}`);
      return actions;
    }
    return this.errorInterceptor.intercept(data);
  }
}
