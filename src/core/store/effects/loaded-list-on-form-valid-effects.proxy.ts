import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  nvl,
  toFormSection,
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
         * @stable [12.04.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(FormActionBuilder.buildValidActionType(nvl(toFormSection(cfg), toListSection(cfg))))
        public $onFormValid = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnFormValidMiddleware({...cfg, action, state})
      }
    }
  );
