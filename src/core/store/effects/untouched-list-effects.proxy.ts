import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ConnectorActionBuilder } from '../../action';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';
import { MiddlewareFactories } from '../middleware';
import {
  NvlUtils,
  SectionUtils,
} from '../../util';
import { provideInSingleton } from '../../di';

/**
 * @effects-proxy-factory
 * @stable [09.09.2020]
 *
 * @param cfg
 */
export const makeUntouchedListEffectsProxy =
  <TState = {}, TDefaultFormChanges = {}>(cfg: IUntouchedListMiddlewareConfigEntity<TState, TDefaultFormChanges>) => (
    (): void => {

      @provideInSingleton(Effects)
      class Effects {

        /**
         * @stable [09.09.2020]
         * @param action
         * @param state
         */
        @EffectsService.effects(
          ConnectorActionBuilder.buildInitActionType(
            NvlUtils.nvl(SectionUtils.asContainerSection(cfg), SectionUtils.asListSection(cfg))
          )
        )
        public $onConnectorInit = (action: IEffectsAction, state: TState): IEffectsAction[] =>
          MiddlewareFactories.untouchedListMiddleware({...cfg, action, state})
      }
    }
  );
