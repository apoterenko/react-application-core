import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  NvlUtils,
  SectionUtils,
  toListSection,
} from '../../util';
import { FormActionBuilder } from '../../action';
import { ILoadedListOnFormValidMiddlewareConfigEntity } from '../../definition';
import { makeLoadedListOnFormValidMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnFormValidMiddlewareConfigEntity<TState>} cfg
 * @returns {() => void}
 */
export const makeLoadedListOnFormValidEffectsProxy =
  <TState = {}>(cfg: ILoadedListOnFormValidMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(
          FormActionBuilder.buildValidActionType(
            NvlUtils.nvl(SectionUtils.asFormSection(cfg), toListSection(cfg))
          )
        )
        public $onFormValid = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnFormValidMiddleware({...cfg, action, state})
      }
    }
  );
