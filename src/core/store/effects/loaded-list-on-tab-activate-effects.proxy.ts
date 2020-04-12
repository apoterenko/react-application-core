import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  nvl,
  toListSection,
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
         * @stable [12.04.2020]
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(
          TabPanelActionBuilder.buildActiveValueActionType(nvl(toTabPanelSection(cfg), toListSection(cfg)))
        )
        public $onTabActivate = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnTabActivateMiddleware({...cfg, action, state})
      }
    }
  );
