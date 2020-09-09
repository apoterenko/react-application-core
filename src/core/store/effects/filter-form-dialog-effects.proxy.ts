import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeFilterFormDialogAcceptMiddleware,
  makeFilterFormDialogClearMiddleware,
  makeFilterFormDialogResetMiddleware,
} from '../middleware';
import { FilterFormDialogActionBuilder } from '../../action';
import { IFilterFormDialogMiddlewareConfigEntity } from '../../definition';
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
        public $onAccept = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeFilterFormDialogAcceptMiddleware({...cfg, action, state})

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildClearActionType(SectionUtils.asFormSection(cfg)))
        public $onClear = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          makeFilterFormDialogClearMiddleware({...cfg, action, state})

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildResetActionType(SectionUtils.asFormSection(cfg)))
        public $onReset = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeFilterFormDialogResetMiddleware({...cfg, action, state})
      }
    };
  };
