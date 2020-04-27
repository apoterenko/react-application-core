import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../action';
import {
  nvl,
  toFormSection,
  toListSection,
} from '../../util';
import { IFilteredListMiddlewareConfigEntity } from '../../definition';
import {
  makeFilteredListApplyMiddleware,
  makeFilteredListDeactivateMiddleware,
} from '../middleware';

/**
 * @effects-proxy-factory
 * @stable [27.04.2020]
 *
 * @param {IFilteredListMiddlewareConfigEntity<TState>} cfg
 * @returns {() => void}
 */
export const makeFilteredListEffectsProxy = <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>) =>
  ((): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [27.04.2020]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterActionBuilder.buildApplyActionType(nvl(toFormSection(cfg), toListSection(cfg))))
      public $onApply = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeFilteredListApplyMiddleware({...cfg, action, state})

      /**
       * @stable [27.04.2020]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterActionBuilder.buildDeactivateActionType(nvl(toFormSection(cfg), toListSection(cfg))))
      public $onDeactivate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeFilteredListDeactivateMiddleware({...cfg, action, state})
    }
  });
