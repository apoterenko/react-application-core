import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { FilterFormDialogActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import { provideInSingleton } from '../../di';
import { SectionUtils } from '../../util';

/**
 * @effects-proxy-factory
 * @stable [09.09.2020]
 */
export const makeFilterFormDialogEffectsProxy =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity) => {

    return (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildAcceptActionType(SectionUtils.asFormSection(cfg)))
        public readonly $onAccept = (action: IEffectsAction, state: TState): IEffectsAction =>
          MiddlewareFactories.filterFormDialogAcceptMiddleware({...cfg, action, state})

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildClearActionType(SectionUtils.asFormSection(cfg)))
        public readonly $onClear = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.filterFormDialogClearMiddleware({...cfg, action, state})

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildResetActionType(SectionUtils.asFormSection(cfg)))
        public readonly $onReset = (action: IEffectsAction, state: TState): IEffectsAction =>
          MiddlewareFactories.filterFormDialogResetMiddleware({...cfg, action, state})
      }
    };
  };
