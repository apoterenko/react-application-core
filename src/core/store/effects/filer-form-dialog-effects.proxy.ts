import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeFilterFormDialogClearMiddleware,
  makeFilterFormDialogAcceptMiddleware,
  makeFilterFormDialogResetMiddleware,
  IFilterFormDialogMiddlewareConfig,
} from '../middleware';
import { FilterFormDialogActionBuilder } from '../../component/dialog/filter-form-dialog/filter-form-dialog-action.builder';

/**
 * @stable [11.03.2019]
 */
export function makeFilterFormDialogEffectsProxy(config: IFilterFormDialogMiddlewareConfig): () => void {
  const filterFormDialogClearMiddleware = makeFilterFormDialogClearMiddleware(config);
  const filterFormDialogResetMiddleware = makeFilterFormDialogResetMiddleware(config);
  const filterFormDialogAcceptMiddleware = makeFilterFormDialogAcceptMiddleware(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [11.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterFormDialogActionBuilder.buildAcceptActionType(config.filterSection))
      public $onAccept(): IEffectsAction {
        return filterFormDialogAcceptMiddleware;
      }

      /**
       * @stable [11.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterFormDialogActionBuilder.buildClearActionType(config.filterSection))
      public $onClear(): IEffectsAction[] {
        return filterFormDialogClearMiddleware;
      }

      /**
       * @stable [12.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterFormDialogActionBuilder.buildResetActionType(config.filterSection))
      public $onReset(): IEffectsAction {
        return filterFormDialogResetMiddleware;
      }
    }
  };
}
