import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ConnectorActionBuilder } from '../../action';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';
import { makeUntouchedListMiddleware } from '../middleware/untouched-list.middleware';
import { provideInSingleton } from '../../di';

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>} config
 * @returns {() => void}
 */
export function makeUntouchedListEffectsProxy<TState, TDefaultFormChanges = {}>(
  config: IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>): () => void {
  const untouchedListMiddleware = makeUntouchedListMiddleware<TState>(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [27.03.2020]
       * @param {IEffectsAction} action
       * @param {TState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(config.listSection))
      public $onConnectorInit(action: IEffectsAction, state: TState): IEffectsAction[] {
        return untouchedListMiddleware(action, state);
      }
    }
  };
}
