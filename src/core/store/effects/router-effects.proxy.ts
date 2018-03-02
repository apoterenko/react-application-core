import { EffectsService, EffectsActionBuilder, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { RouterActionBuilder } from '../../router';

export const makeRouterEffectsProxy = (actionType: string): () => void =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(actionType)
      public $onNavigateBackAction(): IEffectsAction {
        return RouterActionBuilder.buildNavigateBackAction();
      }
    }
  };

export const makeRouterEffectDoneEffectsProxy = (actionType: string): () => void =>
  makeRouterEffectsProxy(EffectsActionBuilder.buildDoneActionType(actionType));
