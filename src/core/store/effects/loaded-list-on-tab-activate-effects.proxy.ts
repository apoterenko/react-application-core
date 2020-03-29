import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  calc,
  nvl,
} from '../../util';
import { ILoadedListOnTabActivateMiddlewareConfigEntity } from '../../definition';
import { makeLoadedListOnTabActivateMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { TabPanelActionBuilder } from '../../component/action.builder';

/**
 * @stable [29.03.2020]
 * @param {ILoadedListOnTabActivateMiddlewareConfigEntity<TState>} config
 * @returns {() => void}
 */
export const makeLoadedListOnTabActivateEffectsProxy =
  <TState = {}>(config: ILoadedListOnTabActivateMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [27.03.2020]
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(TabPanelActionBuilder.buildActivateActionType(calc(nvl(config.tabPanelSection, config.listSection))))
        public $onTabActivate = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnTabActivateMiddleware({...config, action, state})
      }
    }
  );
