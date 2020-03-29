import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { IEntity } from '../../definitions.interface';
import { ListActionBuilder } from '../../component/action.builder';
import {
  makeCreateEntityMiddleware,
  makeLazyLoadedEntityMiddleware,
  makeSelectEntityMiddleware,
} from '../middleware';
import { provideInSingleton } from '../../di';
import { calc } from '../../util';

/**
 * @stable [19.10.2019]
 * @param {IEditedListMiddlewareConfigEntity<TEntity extends IEntity, TState>} config
 * @returns {() => void}
 */
export const makeEditedListEffectsProxy = <TEntity extends IEntity, TState>(
  config: IEditedListMiddlewareConfigEntity<TEntity, TState>) =>
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
        makeCreateEntityMiddleware<TEntity, TState>({...config, action, state})

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(calc(config.listSection)))
      public $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSelectEntityMiddleware<TEntity, TState>({...config, action, state})

      /**
       * @stable [20.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(calc(config.listSection)))
      public $onLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeLazyLoadedEntityMiddleware<TEntity, TState>({...config, action, state})
    }
  };
