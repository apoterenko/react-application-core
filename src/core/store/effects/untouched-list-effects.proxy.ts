import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { TabPanelActionBuilder } from '../../component/action.builder';
import {
  makeUntouchedLazyLoadedListMiddleware,
  makeUntouchedListMiddleware,
} from '../middleware/untouched-list.middleware';
import { ConnectorActionBuilder } from '../../action';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>} config
 * @returns {() => void}
 */
export function makeUntouchedListEffectsProxy<TState, TDefaultFormChanges = {}>(
  config: IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>): () => void {
  const untouchedListMiddleware = makeUntouchedListMiddleware<TState>(config);
  const untouchedLazyLoadedListMiddleware = makeUntouchedLazyLoadedListMiddleware<TState>(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [31.08.2018]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(config.listSection))
      public $onConnectorInit(action: IEffectsAction, state: TState): IEffectsAction[] {
        return untouchedListMiddleware(action, state);
      }

      /**
       * @stable [31.08.2018]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction}
       */
      @EffectsService.effects(TabPanelActionBuilder.buildActivateActionType(config.listSection))
      public $onTabActivate(action: IEffectsAction, state: TState): IEffectsAction {
        return untouchedLazyLoadedListMiddleware(action, state);
      }
    }
  };
}
