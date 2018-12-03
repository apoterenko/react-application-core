import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/action.builder';
import {
  IRefreshedListOnChangeFormMiddlewareConfig,
  makeRefreshedListOnChangeFormMiddleware,
} from '../middleware';

export function makeRefreshedListOnChangeFormEffectsProxy(
  config: IRefreshedListOnChangeFormMiddlewareConfig
): () => void {
  const { listSection } = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [03.12.2018]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FormActionBuilder.buildChangeActionType(listSection))
      public $onFormChange(action: IEffectsAction): IEffectsAction[] {
        return makeRefreshedListOnChangeFormMiddleware({...config, action});
      }
    }
  };
}
