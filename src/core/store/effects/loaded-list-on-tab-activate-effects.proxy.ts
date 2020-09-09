import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  NvlUtils,
  SectionUtils,
  toTabPanelSection,
} from '../../util';
import { ILoadedListOnTabActivateMiddlewareConfigEntity } from '../../definition';
import { makeLoadedListOnTabActivateMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { TabPanelActionBuilder } from '../../action';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnTabActivateMiddlewareConfigEntity<TState>} cfg
 * @returns {() => void}
 */
export const makeLoadedListOnTabActivateEffectsProxy =
  <TState = {}>(cfg: ILoadedListOnTabActivateMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(
          TabPanelActionBuilder.buildActiveValueActionType(
            NvlUtils.nvl(toTabPanelSection(cfg), SectionUtils.asListSection(cfg))
          )
        )
        public $onTabActivate = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnTabActivateMiddleware({...cfg, action, state})
      }
    }
  );
