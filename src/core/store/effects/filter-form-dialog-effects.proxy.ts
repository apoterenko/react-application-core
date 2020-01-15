import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  IFilterFormDialogMiddlewareConfig,
  makeFilterFormDialogAcceptMiddleware,
  makeFilterFormDialogClearMiddleware,
  makeFilterFormDialogResetMiddleware,
} from '../middleware';
import { FilterFormDialogActionBuilder } from '../../action';

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
      @EffectsService.effects(FilterFormDialogActionBuilder.buildAcceptActionType(config.formSection))
      public $onAccept(): IEffectsAction {
        return filterFormDialogAcceptMiddleware;
      }

      /**
       * @stable [11.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterFormDialogActionBuilder.buildClearActionType(config.formSection))
      public $onClear(): IEffectsAction[] {
        return filterFormDialogClearMiddleware;
      }

      /**
       * @stable [12.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterFormDialogActionBuilder.buildResetActionType(config.formSection))
      public $onReset(): IEffectsAction {
        return filterFormDialogResetMiddleware;
      }
    }
  };
}
