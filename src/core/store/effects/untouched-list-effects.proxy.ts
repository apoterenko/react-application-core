import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { ConnectorActionBuilder, TabPanelActionBuilder } from '../../component/action.builder';
import { IUntouchedListMiddlewareConfig } from '../middleware/middleware.interface';
import { makeUntouchedListMiddleware, makeUntouchedLazyLoadedListMiddleware } from '../middleware/untouched-list.middleware';

/**
 * @stable [31.08.2018]
 * @param {IUntouchedListMiddlewareConfig<TApplicationState>} config
 * @returns {() => void}
 */
export function makeUntouchedListEffectsProxy<TApplicationState>(
  config: IUntouchedListMiddlewareConfig<TApplicationState>): () => void {
  const untouchedListMiddleware = makeUntouchedListMiddleware<TApplicationState>(config);
  const untouchedLazyLoadedListMiddleware = makeUntouchedLazyLoadedListMiddleware<TApplicationState>(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [31.08.2018]
       * @param {IEffectsAction} action
       * @param {TApplicationState} state
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(config.listSection))
      public $onConnectorInit(action: IEffectsAction, state: TApplicationState): IEffectsAction {
        return untouchedListMiddleware(action, state);
      }

      /**
       * @stable [31.08.2018]
       * @param {IEffectsAction} action
       * @param {TApplicationState} state
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(TabPanelActionBuilder.buildActivateActionType(config.listSection))
      public $onTabActivate(action: IEffectsAction, state: TApplicationState): IEffectsAction {
        return untouchedLazyLoadedListMiddleware(action, state);
      }
    }
  };
}
