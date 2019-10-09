import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { IEntity } from '../../definitions.interface';
import { ListActionBuilder } from '../../component/action.builder';
import { makeSelectEntityMiddleware, makeCreateEntityMiddleware } from '../middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [09.10.2019]
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
      @EffectsService.effects(ListActionBuilder.buildCreateActionType(config.listSection))
      public $onEntityCreate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeCreateEntityMiddleware<TEntity, TState>({...config, action, state})

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(config.listSection))
      public $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSelectEntityMiddleware<TEntity, TState>({...config, action, state})

      /**
       * @stable [09.10.2019]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(config.listSection))
      public $onEntityLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        makeSelectEntityMiddleware<TEntity, TState>({...config, action, state, lazyLoading: false})
    }
  };
