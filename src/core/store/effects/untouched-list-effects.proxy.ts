import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ConnectorActionBuilder } from '../../action';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';
import { makeUntouchedListMiddleware } from '../middleware';
import {
  nvl,
  toContainerSection,
  toListSection,
} from '../../util';
import { provideInSingleton } from '../../di';

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>} cfg
 * @returns {() => void}
 */
export const makeUntouchedListEffectsProxy =
  <TState = {}, TDefaultFormChanges = {}>(cfg: IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [29.03.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(
          ConnectorActionBuilder.buildInitActionType(nvl(toContainerSection(cfg), toListSection(cfg)))
        )
        public $onConnectorInit = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          makeUntouchedListMiddleware({...cfg, action, state})
      }
    }
  );
