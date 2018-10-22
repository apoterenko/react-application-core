import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FormActionBuilder } from '../../component/form/form-action.builder';
import {
  IRefreshedListOnValidateFormMiddlewareConfig,
  makeRefreshedListOnValidateFormMiddleware,
} from '../middleware';

export function makeRefreshedListOnValidateFormEffectsProxy(
  config: IRefreshedListOnValidateFormMiddlewareConfig
): () => void {
  const { listSection } = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildValidActionType(listSection))
      public $onValid(action: IEffectsAction): IEffectsAction[] {
        return makeRefreshedListOnValidateFormMiddleware({...config, action});
      }
    }
  };
}
