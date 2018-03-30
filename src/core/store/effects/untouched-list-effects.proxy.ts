import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { ConnectorActionBuilder } from '../../component/connector';
import { provideInSingleton } from '../../di';
import { ApplicationStateT } from '../store.interface';
import { makeUntouchedListMiddleware, IUntouchedListMiddlewareConfig } from '../middleware';

/* @stable - 31.03.2018 */
export function makeUntouchedListEffectsProxy<TApplicationState extends ApplicationStateT>(
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
