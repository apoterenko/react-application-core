import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeFormFilterSubmitMiddleware,
  makeFormFilterResetMiddleware,
  makeFormFilterClearMiddleware,
  IFormFilterMiddlewareConfig,
} from '../middleware';
import { FormActionBuilder } from '../../component/form';

/**
 * @stable [02.06.2018]
 */
export function makeFormFilterEffectsProxy(config: IFormFilterMiddlewareConfig): () => void {
  const formFilterSubmitMiddleware = makeFormFilterSubmitMiddleware(config);
  const formFilterResetMiddleware = makeFormFilterResetMiddleware(config);
  const formFilterClearMiddleware = makeFormFilterClearMiddleware(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * Manual clear of a single filter field to provoke a reload.
       *
       * @stable [26.08.2018]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FormActionBuilder.buildClearActionType(config.filterSection))
      public $onFilterClear(): IEffectsAction {
        return formFilterClearMiddleware;
      }

      @EffectsService.effects(FormActionBuilder.buildSubmitActionType(config.filterSection))
      public $onFilterSubmit(): IEffectsAction[] {
        return formFilterSubmitMiddleware;
      }

      @EffectsService.effects(FormActionBuilder.buildResetActionType(config.filterSection))
      public $onFilterReset(): IEffectsAction[] {
        return formFilterResetMiddleware;
      }
    }
  };
}
