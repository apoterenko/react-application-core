import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { ConnectorActionBuilder } from '../../component/connector/universal-connector-action.builder';
import { IUntouchedListMiddlewareConfig } from '../middleware/middleware.interface';
import { makeUntouchedListMiddleware } from '../middleware/untouched-list.middleware';

/* @stable - 31.03.2018 */
export function makeUntouchedListEffectsProxy<TApplicationState>(
  config: IUntouchedListMiddlewareConfig<TApplicationState>): () => void {
  const untouchedListMiddleware = makeUntouchedListMiddleware<TApplicationState>(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(config.section))
      public $onConnectorInit(action: IEffectsAction, state: TApplicationState): IEffectsAction {
        return untouchedListMiddleware(action, state);
      }
    }
  };
}
