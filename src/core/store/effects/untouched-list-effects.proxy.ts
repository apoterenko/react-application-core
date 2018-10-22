import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { UniversalConnectorActionBuilder } from '../../component/connector/universal-connector-action.builder';
import { IUntouchedListMiddlewareConfig } from '../middleware/middleware.interface';
import { makeUntouchedListMiddleware, makeUntouchedLazyLoadedListMiddleware } from '../middleware/untouched-list.middleware';
import { TabPanelActionBuilder } from '../../component/tabpanel/tabpanel-action.builder';

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
      @EffectsService.effects(UniversalConnectorActionBuilder.buildInitActionType(config.listSection))
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
