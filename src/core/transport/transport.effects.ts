import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';
import {
  IRoutesEntity,
  ITransportResponseAccessor,
  ITransportResponseEntity,
} from '../definition';
import { IApplicationTransportErrorInterceptor } from './transport.interface';
import {
  TRANSPORT_REQUEST_ERROR_ACTION_TYPE,
} from './transport-reducer.interface';
import {
  RouterActionBuilder,
} from '../action';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';

@provideInSingleton(TransportEffects)
export class TransportEffects {
  private static logger = LoggerFactory.makeLogger('TransportEffects');

  @lazyInject(DI_TYPES.TransportResponseAccessor) private readonly responseAccessor: ITransportResponseAccessor;
  @lazyInject(DI_TYPES.TransportErrorInterceptor) private readonly errorInterceptor: IApplicationTransportErrorInterceptor;
  @lazyInject(DI_TYPES.Routes) private readonly routes: IRoutesEntity;

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
