import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { IEditedListMiddlewareConfigEntity } from '../../definition';
import { ListActionBuilder } from '../../component/action.builder';
import { MiddlewareFactories } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @stable [28.10.2020]
 * @param cfg
 */
export const makeEditedListEffectsProxy = <TPayload = {}, TState = {}, TDefaultChanges = TPayload>(
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
      public readonly $onEntityCreate = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.createEntityMiddleware({...cfg, action, state});

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(SectionUtils.asListSection(cfg)))
      public readonly $onEntitySelect = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.selectEntityMiddleware({...cfg, action, state});

      /**
       * @stable [09.09.2020]
       * @param action
       * @param state
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(SectionUtils.asListSection(cfg)))
      public readonly $onLazyLoadDone = (action: IEffectsAction, state: TState): IEffectsAction[] =>
        MiddlewareFactories.lazyLoadedEntityMiddleware({...cfg, action, state});
    }
  };
