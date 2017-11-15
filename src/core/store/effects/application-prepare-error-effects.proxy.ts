import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { ApplicationActionBuilder } from '../../component/application';
import { IApplicationTransportPayloadAnalyzer } from '../../transport';

export function makeApplicationPrepareErrorEffectsProxy(): void {

  @provideInSingleton(Effects)
  class Effects {

    @lazyInject(DI_TYPES.TransportPayloadAnalyzer) private tpAnalyzer: IApplicationTransportPayloadAnalyzer;

    @EffectsService.effects(ApplicationActionBuilder.buildPrepareErrorActionType())
    public $onPrepareError(action: IEffectsAction): IEffectsAction {
      return this.tpAnalyzer.isAuthErrorPayload(action)
          ? ApplicationActionBuilder.buildReadyAction() // We must show the login page
          : null;
    }

    @EffectsService.effects(ApplicationActionBuilder.buildPrepareAfterErrorActionType())
    public $onPrepareAfterError(action: IEffectsAction): IEffectsAction {
      return this.tpAnalyzer.isAuthErrorPayload(action)
          ? ApplicationActionBuilder.buildReadyAction() // We must show the login page
          : null;
    }
  }
}
