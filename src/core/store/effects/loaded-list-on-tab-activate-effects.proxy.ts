import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  NvlUtils,
  SectionUtils,
} from '../../util';
import { ILoadedListOnTabActivateMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import { provideInSingleton } from '../../di';
import { TabPanelActionBuilder } from '../../action';

/**
 * @effects-proxy-factory
 * @stable [22.09.2020]
 *
 * @param cfg
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
            NvlUtils.nvl(SectionUtils.asTabPanelSection(cfg), SectionUtils.asListSection(cfg))
          )
        )
        public $onTabActivate = (action: IEffectsAction, state: TState): IEffectsAction =>
          MiddlewareFactories.loadedListOnTabActivateMiddleware({...cfg, action, state})
      }
    }
  );
