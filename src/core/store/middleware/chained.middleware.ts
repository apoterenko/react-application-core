import { IEffectsAction } from 'redux-effects-promise';

import { IChainedMiddlewareConfigEntity } from '../../definition';
import {
  CalcUtils,
  Selectors,
} from '../../util';
import {
  RouterActionBuilder,
  StackActionBuilder,
} from '../../action';

/**
 * @middleware
 * @stable [20.01.2021]
 *
 * @param cfg
 */
const makeChainedMiddleware =
  <TPayload, TState>(cfg: IChainedMiddlewareConfigEntity<TState, TPayload>): IEffectsAction[] =>
    Selectors.preventEffectsFromAction(cfg.action)
      ? null
      : [
        StackActionBuilder.buildLockAction(CalcUtils.calc(cfg.nextSection, cfg)),
        RouterActionBuilder.buildNavigateAction(CalcUtils.calc(cfg.path, cfg))
      ];

/**
 * @stable [20.01.2021]
 */
export class ChainedMiddlewareFactories {
  public static readonly chainedMiddleware = makeChainedMiddleware;
}
