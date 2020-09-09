import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../action';
import {
  NvlUtils,
  SectionUtils,
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
 * @param cfg
 */
export const makeFilteredListEffectsProxy = <TState = {}>(cfg: IFilteredListMiddlewareConfigEntity<TState>) =>
  ((): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(
        FilterActionBuilder.buildApplyActionType(
          NvlUtils.nvl(SectionUtils.asFormSection(cfg), SectionUtils.asListSection(cfg))
        )
      )
      public $onApply = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeFilteredListApplyMiddleware({...cfg, action, state})

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(
        FilterActionBuilder.buildDeactivateActionType(
          NvlUtils.nvl(SectionUtils.asFormSection(cfg), SectionUtils.asListSection(cfg))
        )
      )
      public $onDeactivate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeFilteredListDeactivateMiddleware({...cfg, action, state})
    }
  });
