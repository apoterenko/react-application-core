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
import { toFormSection } from '../../util';

/**
 * @stable [23.04.2020]
 */
export const makeFilterFormDialogEffectsProxy =
  <TState = {}>(cfg: IFilterFormDialogMiddlewareConfigEntity) => {

    return (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [23.04.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildAcceptActionType(toFormSection(cfg)))
        public $onAccept = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeFilterFormDialogAcceptMiddleware({...cfg, action, state})

        /**
         * @stable [23.04.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildClearActionType(toFormSection(cfg)))
        public $onClear = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          makeFilterFormDialogClearMiddleware({...cfg, action, state})

        /**
         * @stable [23.04.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction}
         */
        @EffectsService.effects(FilterFormDialogActionBuilder.buildResetActionType(toFormSection(cfg)))
        public $onReset = (action: IEffectsAction, state: TState): IEffectsAction =>
          makeFilterFormDialogResetMiddleware({...cfg, action, state})
      }
    };
  };
