import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeFormFilterSubmitMiddleware,
  makeFormFilterResetMiddleware,
  IFormFilterMiddlewareConfig,
} from '../middleware';
import { FormActionBuilder } from '../../component/form';

/* @stable - 01.04.2018 */
export function makeFormFilterEffectsProxy(config: IFormFilterMiddlewareConfig): () => void {
  const formFilterSubmitMiddleware = makeFormFilterSubmitMiddleware(config);
  const formFilterResetMiddleware = makeFormFilterResetMiddleware(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildSubmitActionType(config.formFilterSection))
      public $onFilterSubmit(): IEffectsAction[] {
        return formFilterSubmitMiddleware;
      }

      @EffectsService.effects(FormActionBuilder.buildResetActionType(config.formFilterSection))
      public $onFilterReset(): IEffectsAction[] {
        return formFilterResetMiddleware;
      }
    }
  };
}
