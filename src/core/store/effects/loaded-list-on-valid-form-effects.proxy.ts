import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/action.builder';
import { makeLoadedListOnValidMiddleware } from '../middleware';
import { IListEffectsMiddlewareConfig } from '../../definition';

/**
 * @stable [18.02.2019]
 * @param {IListEffectsMiddlewareConfig} config
 * @returns {() => void}
 */
export const makeLoadedListOnFormValidEffectsProxy = (config: IListEffectsMiddlewareConfig): () => void => (
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [27.03.2020]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(FormActionBuilder.buildValidActionType(config.listSection))
      public $onFormValid = (action: IEffectsAction): IEffectsAction =>
        makeLoadedListOnValidMiddleware({...config, action})
    }
  }
);
