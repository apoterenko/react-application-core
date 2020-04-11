import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { calc } from '../../util';
import { ILoadedListOnToolbarToolsRefreshConfigEntity } from '../../definition';
import { makeLoadedListOnToolbarToolsRefreshMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { ToolbarToolsActionBuilder } from '../../action';

/**
 * @stable [11.04.2020]
 * @param {ILoadedListOnToolbarToolsRefreshConfigEntity<TState>} config
 * @returns {() => void}
 */
export const makeToolbarToolsEffectsProxy =
  <TState = {}>(config: ILoadedListOnToolbarToolsRefreshConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [11.04.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(ToolbarToolsActionBuilder.buildRefreshActionType(calc(config.listSection)))
        public $onRefresh = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnToolbarToolsRefreshMiddleware({...config, action, state})
      }
    }
  );
