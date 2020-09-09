import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/action.builder';
import {
  makeCreateEntityMiddleware,
  MiddlewareFactories,
} from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>} cfg
 * @returns {() => void}
 */
export const makeEditedListEffectsProxy = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  cfg: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>) =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(ListActionBuilder.buildCreateActionType(SectionUtils.asListSection(cfg)))
      public $onEntityCreate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeCreateEntityMiddleware({...cfg, action, state})

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(SectionUtils.asListSection(cfg)))
      public $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.selectEntityMiddleware({...cfg, action, state})

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(SectionUtils.asListSection(cfg)))
      public $onLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.lazyLoadedEntityMiddleware({...cfg, action, state})
    }
  };
