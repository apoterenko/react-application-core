import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { FilterActionBuilder } from '../../action';
import { IFilteredListMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @effects-proxy-factory
 * @stable [09.09.2020]
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
      @EffectsService.effects(FilterActionBuilder.buildApplyActionType(SectionUtils.asFormOrListSection(cfg)))
      public $onApply = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.filteredListApplyMiddleware({...cfg, action, state})

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(FilterActionBuilder.buildDeactivateActionType(SectionUtils.asFormOrListSection(cfg)))
      public $onDeactivate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.filteredListDeactivateMiddleware({...cfg, action, state})
    }
  });
