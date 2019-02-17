import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/action.builder';
import {
  IRefreshedListOnValidFormMiddlewareConfig,
  makeRefreshedListOnValidFormMiddleware,
} from '../middleware';

/**
 * @stable [18.02.2019]
 * @param {IRefreshedListOnValidFormMiddlewareConfig} config
 * @returns {() => void}
 */
export const makeRefreshedListOnValidFormEffectsProxy = (config: IRefreshedListOnValidFormMiddlewareConfig): () => void => {
  const {listSection} = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [03.12.2018]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FormActionBuilder.buildValidActionType(listSection))
      public $onFormValid(action: IEffectsAction): IEffectsAction[] {
        return makeRefreshedListOnValidFormMiddleware({...config, action});
      }
    }
  };
};
