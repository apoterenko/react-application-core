import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeDestroyedFormMiddleware,
  IDestroyedFormMiddlewareConfig,
} from '../middleware';
import { UniversalConnectorActionBuilder } from '../../component/connector/universal-connector-action.builder';

/**
 * @stable [21.01.2019]
 * @param {IDestroyedFormMiddlewareConfig} config
 * @returns {() => void}
 */
export function makeDestroyedFormEffectsProxy(config: IDestroyedFormMiddlewareConfig): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(UniversalConnectorActionBuilder.buildDestroyActionType(config.formSection))
      public $onDestroy(): IEffectsAction[] {
        return makeDestroyedFormMiddleware(config);
      }
    }
  };
}
