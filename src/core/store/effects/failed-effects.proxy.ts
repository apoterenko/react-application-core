import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { NotificationActionBuilder } from '../../notification';

export function makeFailedEffectsProxy(actionType: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(actionType)
      public $onError(action: IEffectsAction): IEffectsAction {
        return NotificationActionBuilder.buildErrorAction(action.error);
      }
    }
  };
}
