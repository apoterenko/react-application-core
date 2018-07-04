import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/form';
import { makeSucceedFormMiddleware, ISucceedFormMiddlewareConfig } from '../middleware';

/**
 * @stable [04.07.2018]
 * @param {ISucceedFormMiddlewareConfig} config
 * @returns {() => void}
 */
export function makeSucceedFormEffectsProxy(config: ISucceedFormMiddlewareConfig): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(config.formSection))
      public $onFormSubmitDone(action: IEffectsAction): IEffectsAction[] {
        return makeSucceedFormMiddleware({...config, action});
      }
    }
  };
}
