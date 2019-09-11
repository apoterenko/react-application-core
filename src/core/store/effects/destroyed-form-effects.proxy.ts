import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  makeDestroyedFormMiddleware,
  IDestroyedFormMiddlewareConfig,
} from '../middleware';
import { ConnectorActionBuilder } from '../../component/connector/connector-action.builder';

/**
 * @stable [21.01.2019]
 * @param {IDestroyedFormMiddlewareConfig} config
 * @returns {() => void}
 */
export function makeDestroyedFormEffectsProxy(config: IDestroyedFormMiddlewareConfig): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ConnectorActionBuilder.buildDestroyActionType(config.formSection))
      public $onDestroy(): IEffectsAction[] {
        return makeDestroyedFormMiddleware(config);
      }
    }
  };
}
