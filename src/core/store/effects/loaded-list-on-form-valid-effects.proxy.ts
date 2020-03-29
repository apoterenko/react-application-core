import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  calc,
  nvl,
} from '../../util';
import { FormActionBuilder } from '../../component/action.builder';
import { ILoadedListOnFormValidMiddlewareConfigEntity } from '../../definition';
import { makeLoadedListOnFormValidMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnFormValidMiddlewareConfigEntity<TState>} config
 * @returns {() => void}
 */
export const makeLoadedListOnFormValidEffectsProxy =
  <TState = {}>(config: ILoadedListOnFormValidMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [29.03.2020]
         * @param {IEffectsAction} action
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(FormActionBuilder.buildValidActionType(calc(nvl(config.formSection, config.listSection))))
        public $onFormValid = (action: IEffectsAction): IEffectsAction =>
          makeLoadedListOnFormValidMiddleware({...config, action})
      }
    }
  );
