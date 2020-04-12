import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/action.builder';
import {
  makeCreateEntityMiddleware,
  makeLazyLoadedEntityMiddleware,
  makeSelectEntityMiddleware,
} from '../middleware';
import { provideInSingleton } from '../../di';
import { toListSection } from '../../util';

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
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildCreateActionType(toListSection(cfg)))
      public $onEntityCreate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeCreateEntityMiddleware({...cfg, action, state})

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(toListSection(cfg)))
      public $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSelectEntityMiddleware({...cfg, action, state})

      /**
       * @stable [20.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(toListSection(cfg)))
      public $onLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeLazyLoadedEntityMiddleware({...cfg, action, state})
    }
  };
