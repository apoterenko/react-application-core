import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list';
import { NotificationActionBuilder } from '../../notification';
import { provideInSingleton } from '../../di';

export function makeFailedListEffectsProxy(section: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildLoadErrorActionType(section))
      public $onListLoadError(action: IEffectsAction): IEffectsAction {
        return NotificationActionBuilder.buildErrorAction(action.error);
      }
    }
  };
}
