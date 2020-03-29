import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ConnectorActionBuilder } from '../../action';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';
import { makeUntouchedListMiddleware } from '../middleware';
import { calc, nvl } from '../../util';
import { provideInSingleton } from '../../di';

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>} config
 * @returns {() => void}
 */
export const makeUntouchedListEffectsProxy =
  <TState = {}, TDefaultFormChanges = {}>(config: IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [29.03.2020]
         * @param {IEffectsAction} action
         * @param {TState} state
         * @returns {IEffectsAction[]}
         */
        @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(calc(nvl(config.containerSection, config.listSection))))
        public $onConnectorInit = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          makeUntouchedListMiddleware({...config, action, state})
      }
    }
  );
