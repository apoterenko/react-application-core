import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ILoadedListOnNavigateToPageMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import { PageToolbarActionBuilder } from '../../action';
import { provideInSingleton } from '../../di';
import { toListSection } from '../../util';

/**
 * @stable [15.06.2020]
 * @param {ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>} cfg
 * @returns {() => void}
 */
export const makePaginatedListEffectsProxy =
  <TState = {}>(cfg: ILoadedListOnNavigateToPageMiddlewareConfigEntity<TState>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [15.06.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(
          PageToolbarActionBuilder.buildPreviousPageActionType(toListSection(cfg))
        )
        public $onPrevious = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.loadedListOnNavigateToPreviousPageMiddleware({...cfg, action, state})

        /**
         * @stable [15.06.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(
          PageToolbarActionBuilder.buildNextPageActionType(toListSection(cfg))
        )
        public $onNext = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.loadedListOnNavigateToNextPageMiddleware({...cfg, action, state})

        /**
         * @stable [15.06.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(
          PageToolbarActionBuilder.buildFirstPageActionType(toListSection(cfg))
        )
        public $onFirst = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.loadedListOnNavigateToFirstPageMiddleware({...cfg, action, state})

        /**
         * @stable [15.06.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(
          PageToolbarActionBuilder.buildLastPageActionType(toListSection(cfg))
        )
        public $onLast = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.loadedListOnNavigateToLastPageMiddleware({...cfg, action, state})
      }
    }
  );
