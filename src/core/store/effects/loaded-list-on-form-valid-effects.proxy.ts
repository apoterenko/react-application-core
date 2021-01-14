import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { ILoadedListOnFormValidMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @stable [12.01.2021]
 * @param cfg
 */
export const makeLoadedListOnFormValidEffectsProxy =
  <TState = {}>(cfg: ILoadedListOnFormValidMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [12.01.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FormActionBuilder.buildValidActionType(SectionUtils.asFormOrListSection(cfg)))
        public readonly $onFormValid = (action: IEffectsAction, state: TState): IEffectsAction =>
          MiddlewareFactories.loadedListOnFormValidMiddleware({...cfg, action, state})
      }
    }
  );
