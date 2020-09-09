import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ILoadedListOnToolbarToolsRefreshConfigEntity } from '../../definition';
import { makeLoadedListOnToolbarToolsRefreshMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';
import { ToolbarToolsActionBuilder } from '../../action';

/**
 * @stable [09.09.2020]
 * @param cfg
 */
export const makeToolbarToolsEffectsProxy =
  <TState = {}>(cfg: ILoadedListOnToolbarToolsRefreshConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(ToolbarToolsActionBuilder.buildRefreshActionType(SectionUtils.asListSection(cfg)))
        public $onRefresh = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeLoadedListOnToolbarToolsRefreshMiddleware({...cfg, action, state})
      }
    }
  );
