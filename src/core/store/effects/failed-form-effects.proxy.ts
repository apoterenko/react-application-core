import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/form';
import { NotificationActionBuilder } from '../../notification';

export function makeFailedFormEffectsProxy(section: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(section))
      public $onFormSubmitError(action: IEffectsAction): IEffectsAction {
        return NotificationActionBuilder.buildErrorAction(action.error);
      }
    }
  };
}
