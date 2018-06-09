import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeFormFilterSubmitMiddleware,
  makeFormFilterResetMiddleware,
  IFormFilterSubmitMiddlewareConfig,
} from '../middleware';
import { FormActionBuilder } from '../../component/form';

/**
 * @stable [02.06.2018]
 */
export function makeFormFilterEffectsProxy(config: IFormFilterSubmitMiddlewareConfig): () => void {
  const formFilterSubmitMiddleware = makeFormFilterSubmitMiddleware(config);
  const formFilterResetMiddleware = makeFormFilterResetMiddleware(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

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
