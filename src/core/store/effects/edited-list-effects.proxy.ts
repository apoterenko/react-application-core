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
import { calc } from '../../util';

/**
 * @stable [03.04.2020]
 * @param {IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>} config
 * @returns {() => void}
 */
export const makeEditedListEffectsProxy = <TPayload = {}, TState = {}, TDefaultChanges = {}>(
  config: IEditedListMiddlewareConfigEntity<TPayload, TState, TDefaultChanges>) =>
  (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildCreateActionType(calc(config.listSection)))
      public $onEntityCreate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeCreateEntityMiddleware({...config, action, state})

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(calc(config.listSection)))
      public $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSelectEntityMiddleware({...config, action, state})

      /**
       * @stable [20.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(calc(config.listSection)))
      public $onLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeLazyLoadedEntityMiddleware({...config, action, state})
    }
  };
